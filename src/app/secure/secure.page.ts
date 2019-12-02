import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account/account.service';

@Component({
    selector: 'app-secure',
    templateUrl: './secure.page.html',
    styleUrls: ['./secure.page.sass'],
})
export class SecurePage implements OnInit {

    appPages = [
        {
            title: 'Home',
            url: '/secure/home',
            icon: 'home'
        },
        {
            title: 'Campaigns',
            url: '/secure/campaigns',
            icon: 'list'
        },
        {
            title: 'LFP',
            url: '/secure/looking',
            icon: 'search'
        },
        {
            title: 'Account',
            url: '/secure/account',
            icon: 'person'
        }
    ];

    constructor(private accountService: AccountService) { }

    ngOnInit() {

    }

    ionViewWillEnter(): void {
        console.log('secure');
    }


}
