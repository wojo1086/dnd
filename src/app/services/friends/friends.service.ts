import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {from, Observable} from 'rxjs';
import {bufferCount, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {

    constructor(private afs: AngularFirestore, private authService: AuthService) { }

    public getFriends(): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('friends').get().pipe(
                switchMap(res => {
                    return from(res.docs).pipe(
                        switchMap(friend => this.getFriendData(friend.data().id)),
                        bufferCount(res.size)
                    );
                })
            ))
        );
    }

    getFriendData(id: string): Observable<any> {
        return this.afs.collection(`users`).doc(`${id}`).get();
    }
}
