import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddFriendPageRoutingModule} from './add-friend-routing.module';

import {AddFriendPage} from './add-friend.page';
import {DndColorModule} from '../../../directives/dnd-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddFriendPageRoutingModule,
        DndColorModule,
        ReactiveFormsModule
    ],
    declarations: [AddFriendPage]
})
export class AddFriendPageModule {
}
