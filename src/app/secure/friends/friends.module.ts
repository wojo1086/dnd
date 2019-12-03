import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FriendsPageRoutingModule} from './friends-routing.module';

import {FriendsPage} from './friends.page';
import {DndColorModule} from '../../directives/dnd-toolbar.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FriendsPageRoutingModule,
        DndColorModule,
        FlexLayoutModule
    ],
    declarations: [FriendsPage]
})
export class FriendsPageModule {
}
