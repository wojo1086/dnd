import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {User} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authState = null;
    user$: BehaviorSubject<User> = new BehaviorSubject({} as User);

    constructor(private afAuth: AngularFireAuth) {

    }

    initUser(): Promise<any> {
        return new Promise((resolve, reject) => this.afAuth.user.subscribe(val => {
            this.authState = val;
            this.user$.next(val);
            resolve();
        }));
    }

    get isAuthenticated(): boolean {
        return this.authState !== null;
    }

    get emailIsVerified(): boolean {
        return this.isAuthenticated ? this.authState.emailVerified : false;
    }

    get currentUser(): any {
        return this.isAuthenticated ? this.authState : null;
    }

    get currentUserId(): string {
        return this.isAuthenticated ? this.authState.uid : '';
    }

    get currentUserEmail(): string {
        return this.isAuthenticated ? this.authState.email : '';
    }

    register(email: string, password: string): Observable<any> {
        return from(firebase.auth().createUserWithEmailAndPassword(email, password));
    }

    login(email: string, password: string): Observable<any> {
        return from(firebase.auth().signInWithEmailAndPassword(email, password));
    }

    logout(): Observable<any> {
        return from(this.afAuth.auth.signOut());
    }

    sendVerificationEmail(): Observable<any> {
        return from(this.afAuth.auth.currentUser.sendEmailVerification());
    }
}
