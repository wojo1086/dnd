import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase/app';
import {catchError, first, map, switchMap, tap} from 'rxjs/operators';
import {DataStoreService} from '../data-store/data-store.service';

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
                private dataStore: DataStoreService,
                private afs: AngularFirestore) {
    }

    getCampaigns(): Observable<any> {
        return this.dataStore.get('campaigns', 'campaignsList').pipe(
            catchError(() => this.getCampaignsOnce())
        );
    }

    getCampaign(id: string): Observable<any> {
        return this.dataStore.get('campaigns', id).pipe(
            catchError(() => this.getCampaignOnce(id))
        );
    }

    getCampaignOnce(id: string): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('campaigns').doc(`${id}`).get()),
            map(campaign => campaign.data()),
            tap(campaign => this.dataStore.add('campaigns', id, campaign))
        );
    }

    getCampaignsOnce(): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('campaigns', ref => ref.orderBy('createdAt')).get()),
            map(campaigns => {
                const docs = campaigns.docs.map(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    // const _returnData = {
                    //     id: doc.id,
                    //     name: data.name,
                    //     description: data.description,
                    //     createdAt: data.createdAt.seconds * 1000,
                    //     players: data.players || [],
                    //     nextSession: !!data.nextSession ? new Date(data.nextSession.seconds) : '',
                    //     startTime: !!data.startTime ? new Date(data.startTime.seconds) : ''
                    // };
                    this.dataStore.add('campaigns', doc.id, data);
                    return data;
                });
                this.dataStore.add('campaigns', 'campaignsList', docs);
                return docs;
            })
        );
    }

    createCampaign(data): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('campaigns').add(data)),
            tap(() => this.dataStore.clear('campaigns', 'campaignsList'))
        );
    }

    updateCampaign(id, data): Observable<any> {
        return this.authService.user$.pipe(
            switchMap(user => this.afs.collection(`users`).doc(`${user.uid}`).collection('campaigns').doc(`${id}`).update(data)),
            tap(() => this.dataStore.clear('campaigns', 'campaignsList')),
            tap(() => this.dataStore.clear('campaigns', id))
        );
    }
}
