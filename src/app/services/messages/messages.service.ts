import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(private afs: AngularFirestore, private authService: AuthService) { }

    public getMessages(): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('messages', ref => ref.orderBy('createdAt')).get())
        );
    }
}
