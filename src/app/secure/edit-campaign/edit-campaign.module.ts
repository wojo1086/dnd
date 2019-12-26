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
import {PlacesPageModule} from '../../modals/places/places.module';
import {WgcGalleryPage} from '../../modals/wgc-gallery/wgc-gallery.page';
import {WgcGalleryPageModule} from '../../modals/wgc-gallery/wgc-gallery.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPlayersPageModule,
        EditCampaignPageRoutingModule,
        ReactiveFormsModule,
        DndColorModule,
        MapsPageModule,
        PlacesPageModule,
        WgcGalleryPageModule
    ],
    declarations: [EditCampaignPage],
    entryComponents: [AddPlayersPage, WgcGalleryPage]
})
export class EditCampaignPageModule {
}
