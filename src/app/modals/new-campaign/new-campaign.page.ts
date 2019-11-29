import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-new-campaign',
    templateUrl: './new-campaign.page.html',
    styleUrls: ['./new-campaign.page.sass'],
})
export class NewCampaignPage implements OnInit {
    newCampaignForm: FormGroup;

    constructor(private modalController: ModalController) { }

    ngOnInit() {
    }

    ionViewWillEnter(): void {

    }

    closeModal(): void {
        this.modalController.dismiss();
    }

}
