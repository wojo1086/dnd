import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CampaignsService {
    campaigns;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {

    }

    getCampaigns(): Observable<any> {
        return this.afAuth.user.pipe(
            switchMap(user => {
                this.campaigns = this.afs.collection(`users`).doc(`${user.uid}`).collection('campaigns');
                return this.campaigns.snapshotChanges();
            })
        );
    }

    getCampaigns2() {
        return this.campaigns.snapshotChanges();
    }

    createCampaign(data): Observable<any> {
        return from(this.campaigns.add(data));
    }
}
