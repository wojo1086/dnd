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
                path: 'edit-campaign',
                loadChildren: () => import('./edit-campaign/edit-campaign.module').then( m => m.EditCampaignPageModule)
            },
            {
                path: 'messages',
                loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
            },
            {
                path: 'friends',
                loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
            },
            {
                path: 'campaign',
                loadChildren: () => import('./campaign/campaign.module').then( m => m.CampaignPageModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecurePageRoutingModule {}
