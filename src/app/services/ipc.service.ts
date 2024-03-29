
import { IpcRenderer } from 'electron';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class IpcService {

    private ipc: IpcRenderer | undefined = void 0;

    constructor() {
        if (window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }

    public on(channel: string, listener: Function): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.on(channel, listener);
    }

    public send(channel: string, ...args): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.send(channel, ...args);
    }

}