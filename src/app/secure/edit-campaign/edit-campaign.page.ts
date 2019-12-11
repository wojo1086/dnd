import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CampaignsService} from '../../services/campaigns/campaigns.service';
import {first} from 'rxjs/operators';
import {ModalController, NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {LoadingService} from '../../services/loading/loading.service';
import {ActivatedRoute} from '@angular/router';
import {AddPlayersPage} from '../../modals/add-players/add-players.page';

@Component({
    selector: 'app-edit-campaign',
    templateUrl: './edit-campaign.page.html',
    styleUrls: ['./edit-campaign.page.sass'],
})
export class EditCampaignPage implements OnInit {
    newCampaignForm: FormGroup;
    campaignId;

    constructor(private campaignsService: CampaignsService,
                private route: ActivatedRoute,
                private modalController: ModalController,
                private loadingService: LoadingService,
                private navController: NavController) { }

    ngOnInit() {
        this.campaignId = this.route.snapshot.paramMap.get('campaignId');
        const formData = {
            name: '',
            description: '',
            startTime: undefined,
            endTime: undefined,
            nextSession: undefined,
            players: [{id: '1'}]
        };
        this.resetForm(formData);
        if (this.campaignId !== null) {
            this.getData();
        }
    }

    get players(): FormArray {
        return this.newCampaignForm.get('players') as FormArray;
    }

    private getData(): void {
        this.campaignsService.getCampaign(this.campaignId).pipe(first()).subscribe(res => {
            this.patchForm(res.data());
        });
    }

    async openAddFriendsModal() {
        const modal = await this.modalController.create({
            component: AddPlayersPage
        });
        await modal.present();
    }

    removePlayer(index): void {
        console.log(index);
        this.players.removeAt(index);
    }

    submitForm(): void {
        if (this.newCampaignForm.invalid) {
            return;
        }
        const data = {
            name: this.newCampaignForm.get('name').value,
            description: this.newCampaignForm.get('description').value,
            startTime: this.newCampaignForm.get('startTime').value || '',
            endTime: this.newCampaignForm.get('endTime').value || '',
            nextSession: this.newCampaignForm.get('nextSession').value || '',
            players: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        this.loadingService.presentLoading(`Creating ${data.name}...`).then(() => {
            this.campaignsService.createCampaign(data).pipe(first()).subscribe(() => {
                this.loadingService.cancelLoading();
                this.navController.back();
            });
        });
    }

    private resetForm(data): void {
        this.newCampaignForm = new FormGroup({
            name: new FormControl(data.name, Validators.required),
            description: new FormControl(data.description),
            startTime: new FormControl({value: data.startTime, disabled: true}),
            endTime: new FormControl({value: data.endTime, disabled: true}),
            nextSession: new FormControl(data.nextSession),
            players: new FormArray(this.createPlayerFormArray(data.players))
        });

        this.newCampaignForm.get('nextSession').valueChanges.subscribe(val => {
            if (!val) {
                this.newCampaignForm.get('startTime').disable();
                this.newCampaignForm.get('endTime').disable();
            } else {
                this.newCampaignForm.get('startTime').enable();
                this.newCampaignForm.get('endTime').enable();
            }
        });
    }

    private patchForm(data): void {
        this.newCampaignForm.patchValue({
            name: data.name,
            description: data.description,
            nextSession: data.nextSession,
            startTime: data.startTime,
            endTime: data.endTime
        });
    }

    private createPlayerFormArray(data): FormGroup[] {
        return data.map(player => {
            return new FormGroup({
                id: new FormControl(player.id)
            });
        });
    }

}