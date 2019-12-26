import {Injectable} from '@angular/core';
import {from, iif, Observable, of} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {File} from '@ionic-native/file/ngx';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';

@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

    constructor(private storage: AngularFireStorage,
                private webView: WebView,
                private transfer: FileTransfer,
                private file: File) {
    }

    public getImage(image, download = true): Observable<string> {
        let return$;
        if (download) {
            return$ = from(this.file.checkFile(this.file.dataDirectory, image)).pipe(
                switchMap(found => {
                    if (found) {
                        return of(this.webView.convertFileSrc(this.file.dataDirectory + image));
                    }
                }),
                catchError(() => this.downloadUrl(image))
            );
        } else {
            return$ = this.downloadUrl(image);
        }
        return return$;
    }

    private downloadUrl(image: string): Observable<boolean> {
        const ref = this.storage.ref(image);
        return ref.getDownloadURL().pipe(
            switchMap(dUrl => this.downloadFile(dUrl, image)),
        );
    }

    downloadFile(url, name): Observable<any> {
        const fileTransfer: FileTransferObject = this.transfer.create();
        return from(fileTransfer.download(encodeURI(url), this.file.dataDirectory + name, true)).pipe(
            switchMap(entry => of(this.webView.convertFileSrc(entry.nativeURL)))
        );
    }
}
