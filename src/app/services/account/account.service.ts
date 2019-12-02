import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, from, iif, Observable, of, throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    account;
    isDM$ = new BehaviorSubject(false);

    constructor(private afs: AngularFirestore, private authService: AuthService) {
        authService.user$.pipe(
            mergeMap(user =>
                iif(
                    () => !user.uid,
                    throwError('No UID'),
                    this.afs.collection(`users`).doc(`${user.uid}`).snapshotChanges()
                )
            )
        ).subscribe(res => {
            console.log(res);
            this.isDM$.next(res.payload.data()['dmMode']);
        });
    }

    public setUpNewUser() {
        const data = {
            isDM: false,
            dmMode: false
        };
        return from(this.afs.collection(`users`).doc(`${this.authService.currentUserId}`).set(data));
    }

    public changeAccountType(dmMode): Observable<any> {
        const data = {
            dmMode
        };
        return from(this.afs.collection(`users`).doc(`${this.authService.currentUserId}`).set(data, {merge: true}));
    }
}
