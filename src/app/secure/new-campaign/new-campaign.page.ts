import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CampaignsService} from '../../services/campaigns/campaigns.service';
import {first} from 'rxjs/operators';
import {NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {LoadingService} from '../../services/loading/loading.service';

@Component({
    selector: 'app-new-campaign',
    templateUrl: './new-campaign.page.html',
    styleUrls: ['./new-campaign.page.sass'],
})
export class NewCampaignPage implements OnInit {
    newCampaignForm: FormGroup;

    constructor(private campaignsService: CampaignsService,
                private loadingService: LoadingService,
                private navController: NavController) { }

    ngOnInit() {
        this.resetForm();
    }

    submitForm(): void {
        if (this.newCampaignForm.invalid) {
            return;
        }
        const data = {
            name: this.newCampaignForm.get('name').value,
            description: this.newCampaignForm.get('description').value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        this.loadingService.presentLoading(`Creating ${data.name}...`);
        this.campaignsService.createCampaign(data).pipe(first()).subscribe(() => {
            this.loadingService.cancelLoading();
            this.navController.back();
        });
    }

    private resetForm(): void {
        this.newCampaignForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('')
        });
    }

}
