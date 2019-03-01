import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { MapComponent } from './map.component';
import { LayerComponent } from './layer/layer.component';
import { ProjectionComponent } from './projection/projection.component';
import { TacticalSymbolComponent } from './tactical-symbol/tactical-symbol.component';
import { SvgElementComponent } from '../svg-element/svg-element.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


export const COMPONENTS = [
    MapComponent,
    LayerComponent,
    ProjectionComponent,
    TacticalSymbolComponent,
    SvgElementComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class MapModule { }
