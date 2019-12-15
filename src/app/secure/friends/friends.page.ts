import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends/friends.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DataStoreService} from '../../services/data-store/data-store.service';

@Component({
    selector: 'friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.sass'],
})
export class FriendsPage implements OnInit {
    isLoading: boolean = false;
    friends = [];

    constructor(private friendsService: FriendsService,
                private dataStore: DataStoreService,
                private router: Router) { }

    ngOnInit() {
    }

    ionViewDidEnter(): void {
        this.isLoading = true;
        this.friendsService.getFriends().pipe(first()).subscribe(res => {
            this.friends = res.map(friend => {
                const copy = {...friend};
                copy.createdAt = copy.createdAt.seconds * 1000;
                return copy;
            });
            console.log(this.friends);
            this.isLoading = false;
        });
    }

    findFriend(): void {
        this.router.navigateByUrl('/secure/friends/add-friend');
    }

}
