import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStoreService {

    private store = {};

    constructor() { }

    public add(key1: string, key2: string, value: any) {
        if (!this.store[key1]) {
            this.store[key1] = {};
        }
        this.store[key1][key2] = value;
    }

    public get(key1: string, key2: string): Observable<any> {
        if (!(this.store[key1] || {})[key2]) {
            return throwError(`That data store for ${key1} -> ${key2} does not exist`);
        }
        return of(this.store[key1][key2]);
    }

    public clear(key1: string, key2: string) {
        if (this.store.hasOwnProperty(key1) && this.store[key1].hasOwnProperty(key2)) {
            this.store[key1][key2] = undefined;
        }
    }
}
