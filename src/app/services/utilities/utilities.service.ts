import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    constructor() { }

    public convertFirebaseTimestampToDate(timestamp): Date {
        return new Date(timestamp.seconds);
    }
}
