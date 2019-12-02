import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurePage } from './secure.page';

const routes: Routes = [
    {
        path: '',
        component: SecurePage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'campaigns',
                loadChildren: () => import('../secure/campaigns/campaigns.module').then(m => m.CampaignsPageModule)
            },
            {
                path: 'account',
                loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
            },
            {
                path: 'new-campaign',
                loadChildren: () => import('./new-campaign/new-campaign.module').then(m => m.NewCampaignPageModule)
            },
            {
                path: 'edit-campaign',
                loadChildren: () => import('./edit-campaign/edit-campaign.module').then( m => m.EditCampaignPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecurePageRoutingModule {}
