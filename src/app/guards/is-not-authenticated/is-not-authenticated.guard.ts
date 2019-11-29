import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.auth.isAuthenticated) {
            this.router.navigateByUrl('secure/home');
            return false;
        }
        return true;
    }
}
