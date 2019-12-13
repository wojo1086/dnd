import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FriendsService} from '../../services/friends/friends.service';
import {FormControl} from '@angular/forms';
import {filter, first, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {iif, Observable, of} from 'rxjs';
import {AddFriendService} from '../../services/friends/add-friend/add-friend.service';

@Component({
    selector: 'add-players',
    templateUrl: './add-players.page.html',
    styleUrls: ['./add-players.page.sass'],
})
export class AddPlayersPage implements OnInit {
    // I am using a getter and setter so I can transform the array coming in to just being an array of the IDs of the players
    // currently assigned to the campaign
    @Input() set players(val) {
        this._players = val;
    }
    get players() {
        return this._players.map(player => player.id);
    }
    private _players;
    selectedList: string = 'friends';
    search: FormControl = new FormControl('');
    friends = []; // Unchanging friends list
    filteredFriends = []; // Filtered list for the view
    users = []; // List of users for the view based on search

    constructor(private modalController: ModalController,
                private addFriendService: AddFriendService,
                private friendsService: FriendsService) { }

    ngOnInit() {
        this.friendsService.getFriends().pipe(first()).subscribe(res => {
            this.friends = res.map(friend => {
                friend.createdAt = friend.createdAt.seconds * 1000; // Set this now so Angular can properly pipe it through the Date pipe
                // For keeping track of when the user adds players to the campaign, we can show a loading icon in place
                // of the `add new player` icon
                friend.isLoading = false;
                friend.isPlaying = this.players.includes(friend.id); // Check if that player already exists for the campaign
                return friend;
            });
            this.filteredFriends = [...this.friends];
        });
        this.search.valueChanges.pipe(
            mergeMap((search: string) =>
                iif(
                    () => this.selectedList === 'friends',
                    this.filterFriends(search),
                    this.filterEverywhere(search)
                )
            )
        ).subscribe();
    }

    private filterFriends(search: string): Observable<any> {
        return of(this.friends).pipe(
            map(friends => friends.filter(friend => friend.username.indexOf(search) > -1)),
            tap(friends => this.filteredFriends = friends)
        );
    }

    private filterEverywhere(searchVal: string): Observable<any> {
        return of(searchVal).pipe(
            tap(() => this.users = []),
            filter(search => search !== ''),
            switchMap(search => this.addFriendService.searchUsers(search, `${search}\uf8ff`, 'username', 50)),
            map(users => users.docs.map(doc => {
                const user = doc.data();
                user.id = doc.id;
                user.isLoading = false;
                user.isPlaying = this.players.includes(user.id);
                return user;
            })),
            tap(users => this.users = users)
        );
    }

    dismissModal(): void {
        this.modalController.dismiss({players: this._players});
    }

    segmentChanged(evt) {
        this.selectedList = evt.detail.value;
    }

    // TODO: Send message to user being added so they can approve
    add(user): void {
        user.isLoading = true;
        const players = [...this._players];
        players.push(user);
        this.players = [...players];
        user.isLoading = false;
        user.isPlaying = true;
    }

}
