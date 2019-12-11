import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {IsLoggedGuard} from './guards/is-logged/is-logged.guard';
import {IsNotAuthenticatedGuard} from './guards/is-not-authenticated/is-not-authenticated.guard';
import {isDMResolver} from './resolvers/is-dm/is-dm.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        canActivate: [IsNotAuthenticatedGuard],
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        canActivate: [IsNotAuthenticatedGuard],
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'activate-account',
        canActivate: [IsNotAuthenticatedGuard],
        loadChildren: () => import('./activate-account/activate-account.module').then(m => m.ActivateAccountPageModule)
    },
    {
        path: 'secure',
        canActivate: [IsLoggedGuard],
        resolve: {
            isDM: isDMResolver
        },
        loadChildren: () => import('./secure/secure.module').then(m => m.SecurePageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
