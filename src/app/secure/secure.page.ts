import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account/account.service';

@Component({
    selector: 'app-secure',
    templateUrl: './secure.page.html',
    styleUrls: ['./secure.page.sass'],
})
export class SecurePage implements OnInit {
    appPages = [];
    defaultAppPages = [
        {
            title: 'Home',
            url: '/secure/home',
            icon: 'home',
            index: 0
        },
        {
            title: 'LFG',
            url: '/secure/looking',
            icon: 'search',
            index: 2
        },
        {
            title: 'Friends',
            url: '/secure/friends',
            icon: 'contacts',
            index: 3
        },
        {
            title: 'Messages',
            url: '/secure/messages',
            icon: 'mail',
            index: 4
        },
        {
            title: 'Account',
            url: '/secure/account',
            icon: 'person',
            index: 5
        }
    ];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.isDM$.subscribe(isDM => {
            this.appPages = [...this.defaultAppPages];
            if (isDM) {
                this.appPages.push({
                    title: 'Campaigns',
                    url: '/secure/campaigns',
                    icon: 'list',
                    index: 1
                });

                this.appPages.filter(page => page.index === 2)[0].title = 'LFP';
            }

            this.appPages.sort((a, b) => a.index - b.index);
        });

    }

    ionViewWillEnter(): void {
        console.log('secure');
    }


}
