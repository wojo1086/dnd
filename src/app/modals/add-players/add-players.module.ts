import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {AddPlayersPage} from './add-players.page';
import {DndColorModule} from '../../directives/dnd-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DndColorModule
    ],
    declarations: [AddPlayersPage]
})
export class AddPlayersPageModule {
}
