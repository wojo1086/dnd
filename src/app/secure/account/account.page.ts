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
    isDM: boolean = false;

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router) {
        accountService.isDM$.subscribe(res => {
            console.log(res);
            this.isDM = res;
        });
    }

    ngOnInit() {
    }

    switchAccountType(isDM): void {
        this.accountService.changeAccountType(isDM).pipe(first()).subscribe(res => console.log(res));
    }

    logout(): void {
        this.authService.logout().pipe(first()).subscribe(() => {
            this.router.navigateByUrl('login');
        });
    }

}
