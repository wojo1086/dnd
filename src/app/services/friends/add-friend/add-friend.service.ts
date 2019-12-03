import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AddFriendService {

    constructor(private afs: AngularFirestore, private authService: AuthService) { }

    addFriend(id: string): Observable<any> {
        const data = {
            id,
            isPending: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('friends').add(data))
        );
    }

    public checkIfFriendExists(email: string): Observable<any> {
        return this.afs.collection(`users`, ref => ref.where('email', '==', email)).get();
    }
}
