import { Injectable } from '@angular/core';
import * as WorldWind from '@nasaworldwind/worldwind';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputHandlerService {

  catchEnabled: boolean;
  inputEvent = new Subject<WorldWind.Location>();
  contextEvent = new Subject<any>();
  pickedItem = null;
  isDragging = false;
  redrawRequired = false;

  constructor() {
    this.catchEnabled = false;

  }

  startCatchInput() {
    this.catchEnabled = true;
  }

  handleEvent(event): boolean {
    let eventType = event.type;
    let isTouchDevice = false;
    let isRedrawNeeded = false;
    let x: number;
    let y: number;

    // Alias PointerEvent event types to mouse and touch event types
    if (event.type === 'pointerdown') {
      eventType = event.pointerType === 'mouse' ? 'mousedown' : 'touchstart';
      isTouchDevice = (event.pointerType === 'touch');
    } else if (event.type === 'pointermove') {
      eventType = event.pointerType === 'mouse' ? 'mousemove' : 'touchmove';
      isTouchDevice = (event.pointerType === 'touch');
    } else if (event.type === 'pointerout' || event.type === 'pointercancel') {
      eventType = event.pointerType === 'mouse' ? 'mouseout' : 'touchcancel';
      isTouchDevice = (event.pointerType === 'touch');
    } else if (event.type === 'pointerup') {
      eventType = event.pointerType === 'mouse' ? 'mouseup' : 'touchend';
      isTouchDevice = (event.pointerType === 'touch');
    }

    /*
    if (event.type === 'pointerdown' && event.pointerType === 'mouse') {
      eventType = 'mousedown';
    } else if (event.type === 'pointermove' && event.pointerType === 'mouse') {
      eventType = 'mousemove';
    } else if (event.type === 'pointerout' && event.pointerType === 'mouse') {
      eventType = 'mouseout';
    } else if (event.type === 'pointerup' && event.pointerType === 'mouse') {
      eventType = 'mouseup';
    } else if (event.type === 'pointerdown' && event.pointerType === 'touch') {
      eventType = 'touchstart';
      isTouchDevice = true;
    } else if (event.type === 'pointermove' && event.pointerType === 'touch') {
      eventType = 'touchmove';
      isTouchDevice = true;
    } else if (event.type === 'pointercancel' && event.pointerType === 'touch') {
      eventType = 'touchcancel';
      isTouchDevice = true;
    } else if (event.type === 'pointerup' && event.pointerType === 'touch') {
      eventType = 'touchend';
      isTouchDevice = true;
    }
    */


    // Get our X,Y values from the event;
    // determine if this is a touch device.
    if (isTouchDevice) {
      // Use the first touches entry
      // Note: x, y remain undefined for touchend
      if (event.touches && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else {
        x = event.clientX;
        y = event.clientY;
      }
    } else {
      // Mouse events
      x = event.clientX;
      y = event.clientY;
    }

    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    const pickList = event.worldWindow.pick(event.worldWindow.canvasCoordinates(x, y));

    switch (eventType) {
      case 'mousedown':
      case 'touchstart':
        this.handleMouseDown(pickList);
        break;
      case 'mousemove':
      case 'touchmove':
        isRedrawNeeded = this.handleMouseMove(pickList);
        break;
      case 'mouseup':
      case 'mouseout':
      case 'touchend':
      case 'touchcancel':
        this.handleMouseUp();
        break;
      case 'click':
        this.handleClick(pickList);
        break;
      case 'dblclick':
        this.handleDoubleClick(pickList);
        break;
      case 'contextmenu':
        this.handleContextMenu(pickList);
        break;
    }

    // Prevent pan/drag operations on the globe when we're dragging an object.
    if (this.isDragging) {
      console.log('[PREVENT] ***');
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    return isRedrawNeeded;
  }

  /**
   * The common gesture-handling function.
   * @param mouseUpEvent WorlWind input event
   */
  handleClick(pickList: any): void {
    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    if (pickList.objects.length > 0) {
      if (this.catchEnabled) {
        pickList.objects
          .filter(element => element.isTerrain)
          .map(element => {
            // If only one thing is picked and it is the terrain, use a go-to animator to go to the picked location.
            const position = element.position;
            const point = new WorldWind.Location(position.latitude, position.longitude);
            console.log('Click Event Listener callback --> %s', JSON.stringify(point));
            this.inputEvent.next(point);
            this.catchEnabled = false;
          });
      }
    }
  }

  /**
   * The common gesture-handling function.
   * @param mouseUpEvent WorlWind input event
   */
  handleDoubleClick(pickList: any): void {
    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    if (pickList.objects.length > 0) {
      pickList.objects
        .filter(elem => !elem.isTerrain)
        .map(elem => {
          elem.userObject.highlighted = !elem.userObject.highlighted;
          // Establish the picked item - may be used by
          // mouse, select, and open actions
          this.pickedItem = (elem.userObject.highlighted) ? elem : null;
        });
    }
  }

  handleMouseDown(pickList: any): void {
    if (this.pickedItem) {
      if (pickList.hasNonTerrainObjects()) {
        const obj = this.pickedItem;
        const values = pickList.objects.filter(elem => !elem.isTerrain);
        this.isDragging = values.find(elem => elem.userObject.displayName === obj.userObject.displayName);
      }
    }
  }

  handleMouseMove(pickList: any): boolean {
    if (this.isDragging) {
      console.log('[MOUSEMOVE] **** ');
      // Get the new terrain coords at the pick point
      const terrainObject = pickList.terrainObject();
      if (terrainObject && this.pickedItem) {
        if (this.pickedItem.userObject.position) {
          this.pickedItem.userObject.position =
            new WorldWind.Position(
              terrainObject.position.latitude,
              terrainObject.position.longitude,
              this.pickedItem.userObject.position.elevation);
          // redraw to make the changes take effect on the screen
          return true;
        }

        /**
         * if (this.pickedItem.userObject) {
         *  // Fires EVENT_OBJECT_MOVED
         *   this.pickedItem.userObject.moveToLatLon(terrainObject.position.latitude, terrainObject.position.longitude);
         * }
         */
      }
    }
    return false;
  }

  handleMouseUp(): void {
    if (this.pickedItem) {
      // The end of a touch can signal either the end of a
      // drag/move operation or a tap/double-tap.
      // If our isDragging flag is set, then it"s a given
      // that the touch/mouse event signals a move finished.
      if (this.isDragging) {
        this.isDragging = false;
      }
    }
  }

  handleContextMenu(pickList) {
    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    if (pickList.objects.length > 0) {
      pickList.objects
        .filter(elem => !elem.isTerrain)
        .map(elem => {
          this.contextEvent.next(elem);
          if (elem.userObject.showContextMenu) {
            console.log('[HANDLE-CONTEXT] opening context menu');
            elem.userObject.showContextMenu();
          } else {
            // Otherwise, build a context menu from standard capabilities
            console.log('[HANDLE-CONTEXT] no context menu');
          }
        });
    }
  }


}
