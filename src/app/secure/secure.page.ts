import {Component, OnInit} from '@angular/core';

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

    constructor() { }

    ngOnInit() {

    }

    ionViewWillEnter(): void {
        console.log('secure');
    }


}
