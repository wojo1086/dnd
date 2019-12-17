import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

    constructor(private storage: AngularFireStorage) { }

    public getImage(url): Observable<string | null> {
        const ref = this.storage.ref(url);
        return ref.getDownloadURL();
    }
}
