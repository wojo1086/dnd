import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AccountService} from '../../services/account/account.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.sass'],
})
export class AccountPage implements OnInit {

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router) { }

    ngOnInit() {
    }

    upgrade(): void {
        this.accountService.changeAccountType(true).pipe(first()).subscribe(res => console.log(res));
    }

    logout(): void {
        this.authService.logout().pipe(first()).subscribe(() => {
            this.router.navigateByUrl('login');
        });
    }

}
