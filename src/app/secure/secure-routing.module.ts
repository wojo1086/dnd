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
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecurePageRoutingModule {}
