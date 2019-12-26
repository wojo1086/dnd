import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {WgcGalleryPage} from './wgc-gallery.page';
import {DndColorModule} from '../../directives/dnd-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DndColorModule,
  ],
  declarations: [WgcGalleryPage]
})
export class WgcGalleryPageModule {}
