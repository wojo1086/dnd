import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AddFriendService} from '../../../services/friends/add-friend/add-friend.service';
import {filter, first, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../../services/auth/auth.service';
import {LoadingService} from '../../../services/loading/loading.service';
import {FriendsService} from '../../../services/friends/friends.service';

@Component({
    selector: 'add-friend',
    templateUrl: './add-friend.page.html',
    styleUrls: ['./add-friend.page.sass'],
})
export class AddFriendPage implements OnInit {
    email: FormControl;
    users = [];
    friends$ = this.friendsService.getFriends().pipe(
        map(friends => friends.map(friend => friend.id))
    );

    constructor(private addFriendService: AddFriendService,
                private authService: AuthService,
                private friendsService: FriendsService,
                private navController: NavController,
                private loadingService: LoadingService,
                private toastController: ToastController) {
    }

    ngOnInit() {
        this.email = new FormControl('', Validators.required);
        this.email.valueChanges.pipe(
            tap(() => this.users = []),
            filter(search => search !== ''),
            switchMap(search => this.addFriendService.searchUsers(search, `${search}\uf8ff`, 'username')),
            withLatestFrom(this.friends$)
        ).subscribe(res => {
            console.log(res);
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
            // this.showToast(`Added ${this.email.value}`, 'success');
            user.isFriend = true;
            user.isLoading = false;
        });
    }

    private async showToast(message, color) {
        const toast = await this.toastController.create({
            message,
            position: 'bottom',
            duration: 3000,
            color
        });
        toast.present();
    }

}
