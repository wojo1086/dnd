import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditCampaignPageRoutingModule} from './edit-campaign-routing.module';

import {EditCampaignPage} from './edit-campaign.page';
import {DndColorModule} from '../../directives/dnd-toolbar.module';
import {AddPlayersPageModule} from '../../modals/add-players/add-players.module';
import {AddPlayersPage} from '../../modals/add-players/add-players.page';
import {MapsPageModule} from '../../modals/maps/maps.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPlayersPageModule,
        EditCampaignPageRoutingModule,
        ReactiveFormsModule,
        DndColorModule,
        MapsPageModule
    ],
    declarations: [EditCampaignPage],
    entryComponents: [AddPlayersPage]
})
export class EditCampaignPageModule {
}
