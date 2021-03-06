import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.auth.isAuthenticated) {
            this.router.navigateByUrl('login');
            return false;
        } else if (!this.auth.emailIsVerified) {
            this.router.navigateByUrl('activate-account');
            return false;
        }
        return true;
    }

}
