import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  OpenSFA = '[Layout] Open SFA',
  CloseSFA = '[Layout] Close SFA',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}

export class OpenSFA implements Action {
  readonly type = LayoutActionTypes.OpenSFA;
}

export class CloseSFA implements Action {
  readonly type = LayoutActionTypes.CloseSFA;
}

export type LayoutActionsUnion = OpenSidenav | CloseSidenav | OpenSFA | CloseSFA;
