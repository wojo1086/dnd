import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CampaignsPageRoutingModule} from './campaigns-routing.module';

import {CampaignsPage} from './campaigns.page';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DndColorModule} from '../../directives/dnd-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CampaignsPageRoutingModule,
        FlexLayoutModule,
        DndColorModule
    ],
    declarations: [CampaignsPage]
})
export class CampaignsPageModule {
}
