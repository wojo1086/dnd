import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loader;

    constructor(private loadingController: LoadingController) { }

    async presentLoading(message: string): Promise<any> {
        this.loader = await this.loadingController.create({
            message
        });
        await this.loader.present();
    }

    cancelLoading(): void {
        if (this.loader) {
            this.loader.dismiss();
        }
    }
}
