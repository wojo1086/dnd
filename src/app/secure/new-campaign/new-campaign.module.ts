import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCampaignPageRoutingModule } from './new-campaign-routing.module';

import { NewCampaignPage } from './new-campaign.page';
import {DndColorModule} from '../../directives/dnd-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewCampaignPageRoutingModule,
        ReactiveFormsModule,
        DndColorModule
    ],
    declarations: [NewCampaignPage]
})
export class NewCampaignPageModule {}
