import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AddFriendService} from '../../../services/friends/add-friend/add-friend.service';
import {filter, first, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AuthService} from '../../../services/auth/auth.service';
import {FriendsService} from '../../../services/friends/friends.service';

@Component({
    selector: 'add-friend',
    templateUrl: './add-friend.page.html',
    styleUrls: ['./add-friend.page.sass'],
})
export class AddFriendPage implements OnInit {
    username: FormControl;
    users = [];
    friends$ = this.friendsService.getFriends().pipe(
        map(friends => friends.map(friend => friend.id))
    );

    constructor(private addFriendService: AddFriendService,
                private authService: AuthService,
                private friendsService: FriendsService) {
    }

    ngOnInit() {
        this.username = new FormControl('', Validators.required);
        this.username.valueChanges.pipe(
            tap(() => this.users = []),
            filter(search => search !== ''),
            switchMap(search => this.addFriendService.searchUsers(search, `${search}\uf8ff`, 'username', 10)),
            withLatestFrom(this.friends$)
        ).subscribe(res => {
            this.users = res[0].docs.map(doc => {
                const user = doc.data();
                user.id = doc.id;
                user.isLoading = false;
                user.isFriend = res[1].includes(user.id);
                return user;
            }).filter(user => user.id !== this.authService.currentUserId);
        });
    }

    add(user) {
        user.isLoading = true;
        this.addFriendService.addFriend(user.id).pipe(first()).subscribe(res => {
            user.isFriend = true;
            user.isLoading = false;
        });
    }
}
