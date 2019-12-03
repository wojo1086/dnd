import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {AccountService} from '../../services/account/account.service';

@Injectable({
    providedIn: 'root'
})
export class isDMResolver implements Resolve<any> {

    constructor(private accountService: AccountService) {}

    resolve() {
        return this.accountService.setData();
    }

}
