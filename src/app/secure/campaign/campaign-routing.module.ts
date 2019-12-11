import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CampaignPage} from './campaign.page';

const routes: Routes = [
    {
        path: '',
        component: CampaignPage
    },
    {
        path: ':campaignId',
        component: CampaignPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CampaignPageRoutingModule {}
