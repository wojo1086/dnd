import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FriendsService} from '../../services/friends/friends.service';
import {FormControl} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
    selector: 'add-players',
    templateUrl: './add-players.page.html',
    styleUrls: ['./add-players.page.sass'],
})
export class AddPlayersPage implements OnInit {
    selectedList: string = 'friends';
    search: FormControl = new FormControl('');
    friends = [];

    constructor(private modalController: ModalController,
                private friendsService: FriendsService) { }

    ngOnInit() {
        this.friendsService.getFriends().pipe(first()).subscribe(res => {
            console.log(res);
            this.friends = res.map(friend => {
                friend.createdAt = friend.createdAt.seconds * 1000;
                return friend;
            });
        });
        this.search.valueChanges.subscribe(console.log);
    }

    dismissModal(): void {
        this.modalController.dismiss();
    }

    segmentChanged(evt) {
        this.selectedList = evt.detail.value;
    }

}
