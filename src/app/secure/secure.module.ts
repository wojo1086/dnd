import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SecurePageRoutingModule} from './secure-routing.module';

import {SecurePage} from './secure.page';
import {DndColorModule} from '../directives/dnd-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SecurePageRoutingModule,
        DndColorModule
    ],
    declarations: [SecurePage]
})
export class SecurePageModule {}
