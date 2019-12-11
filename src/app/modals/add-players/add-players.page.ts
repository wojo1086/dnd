import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'add-players',
    templateUrl: './add-players.page.html',
    styleUrls: ['./add-players.page.sass'],
})
export class AddPlayersPage implements OnInit {
    selectedList: string = 'friends';

    constructor(private modalController: ModalController) { }

    ngOnInit() {
    }

    dismissModal(): void {
        this.modalController.dismiss();
    }

    segmentChanged(evt) {
        this.selectedList = evt.detail.value;
    }

}
