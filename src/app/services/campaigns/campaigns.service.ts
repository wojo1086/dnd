import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase/app';

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
    campaigns;

    constructor(private afAuth: AngularFireAuth,
                private authService: AuthService,
                private afs: AngularFirestore) {
        this.campaigns = this.afs.collection(`users`).doc(`${authService.currentUserId}`).collection('campaigns', ref => ref.orderBy('createdAt'));
    }

    getCampaigns(): Observable<any> {
        return this.campaigns.snapshotChanges();
    }

    createCampaign(data): Observable<any> {
        return from(this.campaigns.add(data));
    }
}
