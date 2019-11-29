import {Observable, of} from 'rxjs';
import {HTTP_ERRORS} from '../constants/errors';
import {ToastController} from '@ionic/angular';

export class ErrorHandler {

    constructor(public toastController: ToastController) {
    }

    handleError(error): Observable<false> {
        console.log(error);
        let message = '';
        if (error.error instanceof ErrorEvent) {
            message = HTTP_ERRORS.default;
        } else {
            message = HTTP_ERRORS[error.code];
        }
        this.presentToast(message);
        return of(false);
    }

    private async presentToast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 3000,
            position: 'top',
            color: 'danger'
        });
        toast.present();
    }
}
