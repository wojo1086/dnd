import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import {DndColorModule} from '../../directives/dnd-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlacesPageRoutingModule,
        DndColorModule,
        ReactiveFormsModule
    ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
