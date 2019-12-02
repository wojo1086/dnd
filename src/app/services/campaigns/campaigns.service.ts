import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase/app';
import {combineLatest, first, withLatestFrom} from 'rxjs/operators';

export interface ICampaign {
    name: string;
    description: string;
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
}

@Injectable({
    providedIn: 'root'
})
export class CampaignsService {
    campaignsCollection;

    constructor(private afAuth: AngularFireAuth,
                private authService: AuthService,
                private afs: AngularFirestore) {
        this.campaignsCollection = this.afs.collection(`users`).doc(`${authService.currentUserId}`).collection('campaigns', ref => ref.orderBy('createdAt'));
    }

    getCampaigns(): Observable<any> {
        return this.campaignsCollection.snapshotChanges();
    }

    getCampaignsOnce(): Observable<any> {
        return this.campaignsCollection.get();
    }

    createCampaign(data): Observable<any> {
        return from(this.campaignsCollection.add(data));
    }
}
