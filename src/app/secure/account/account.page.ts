import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.sass'],
})
export class AccountPage implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    logout(): void {
        this.authService.logout().pipe(first()).subscribe(() => {
            this.router.navigateByUrl('login');
        });
    }

}
