import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {from, iif, Observable, of} from 'rxjs';
import {bufferCount, flatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {

    constructor(private afs: AngularFirestore, private authService: AuthService) { }

    public getFriends(): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('friends').get().pipe(
                mergeMap(res =>
                    iif(
                        () => res.empty,
                        of([]),
                        from(res.docs).pipe(
                            flatMap(friend => {
                                return this.getFriendData(friend.data().id).pipe(
                                    map(friendData => {
                                        return {...friendData.data(), ...friend.data()};
                                    })
                                );
                            }),
                            bufferCount(res.size)
                        )
                    )
                )
            ))
        );
    }

    getFriendData(id: string): Observable<any> {
        return this.afs.collection(`users`).doc(`${id}`).get();
    }
}
