import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.sass'],
})
export class HomePage {

    constructor(private auth: AuthService) {}

    ionViewWillEnter() {
        console.log(this.auth.currentUser);
    }

}
