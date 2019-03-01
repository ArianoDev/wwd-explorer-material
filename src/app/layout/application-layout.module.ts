import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
// import { NotFoundPageComponent } from './containers/not-found-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { NavItemComponent } from './components/sidenav/nav-item.component';
import { MapModule } from '../map/map.module';
import { TacticalSymbolDetailComponent } from './components/tactical-symbol-detail/tactical-symbol-detail.component';


export const COMPONENTS = [
  AppComponent,
  // NotFoundPageComponent,
  ToolbarComponent,
  NavItemComponent,
  DashboardComponent,
  TacticalSymbolDetailComponent
];

@NgModule({
  imports: [
     CommonModule,
     RouterModule,
     MaterialModule,
     MapModule
    ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [TacticalSymbolDetailComponent]
})
export class ApplicationLayoutModule {}
