import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends/friends.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.sass'],
})
export class FriendsPage implements OnInit {
    isLoading: boolean = false;
    friends = [];

    constructor(private friendsService: FriendsService, private router: Router) { }

    ngOnInit() {
    }

    ionViewDidEnter(): void {
        this.isLoading = true;
        this.friendsService.getFriends().pipe(first()).subscribe(res => {
            console.log(res);
            this.friends = res;
            this.isLoading = false;
        });
    }

    findFriend(): void {
        this.router.navigateByUrl('/secure/friends/add-friend');
    }

}
