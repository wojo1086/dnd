import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CampaignsService} from '../../services/campaigns/campaigns.service';
import {first, startWith, switchMap, tap} from 'rxjs/operators';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import {LoadingService} from '../../services/loading/loading.service';
import {ActivatedRoute} from '@angular/router';
import {AddPlayersPage} from '../../modals/add-players/add-players.page';
import {FireStorageService} from '../../services/fire-storage/fire-storage.service';
import {MapsPage} from '../../modals/maps/maps.page';
import {PlacesPage} from '../../modals/places/places.page';
import {WgcGalleryPage} from '../../modals/wgc-gallery/wgc-gallery.page';

@Component({
    selector: 'app-edit-campaign',
    templateUrl: './edit-campaign.page.html',
    styleUrls: ['./edit-campaign.page.sass'],
})
export class EditCampaignPage implements OnInit {
    newCampaignForm: FormGroup;
    selectedTab: string = 'basic';
    campaignId;
    avatar = '';
    campaignImage = '';
    opacity = 1;

    constructor(private campaignsService: CampaignsService,
                private route: ActivatedRoute,
                private actionSheetController: ActionSheetController,
                private fireStorage: FireStorageService,
                private modalController: ModalController,
                private loadingService: LoadingService,
                private navController: NavController) { }

    ngOnInit() {

        this.campaignId = this.route.snapshot.paramMap.get('campaignId');
        this.fireStorage.getImage('d20.png').pipe(first()).subscribe(img => {
            this.avatar = img;
        });
        const formData = {
            name: '',
            description: '',
            startTime: undefined,
            endTime: undefined,
            nextSession: undefined,
            location: '',
            image: 'campaign-placeholder.png',
            players: []
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
            this.patchForm(res);
        });
    }

    editImage() {

    }

    async openAddFriendsModal() {
        const modal = await this.modalController.create({
            component: AddPlayersPage,
            componentProps: {
                players: this.players.value
            }
        });
        await modal.present();
        const data = await modal.onWillDismiss();
        this.players.clear(); // Clear the existing players so we can re-add everyone plus any new ones
        data.data.players.forEach(player => {
            this.players.push(this.createPlayer(player));
        });
    }

    async openPlacesModal() {
        const modal = await this.modalController.create({
            component: PlacesPage,
            componentProps: {
                location: this.newCampaignForm.get('location')
            }
        });
        await modal.present();
    }

    // async openMapsModal() {
    //     const modal = await this.modalController.create({
    //         component: MapsPage,
    //         showBackdrop: false,
    //         cssClass: 'remove-backdrop',
    //         componentProps: {
    //             title: 'Location'
    //         }
    //     });
    //     this.opacity = 0;
    //     await modal.present();
    //     const data = await modal.onWillDismiss();
    //     this.opacity = 1;
    // }

    async openImageActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [
                {
                    text: 'WGC Gallery',
                    icon: 'photos',
                    handler: this.openWGCGallery.bind(this)
                }
            ]
        });
        await actionSheet.present();
    }

    private async openWGCGallery() {
        const modal = await this.modalController.create({
            component: WgcGalleryPage,
        });
        await modal.present();
        const data = await modal.onWillDismiss();
        if (!!data.data) {
            // this.campaignImage = data.data.image.fullPath;
            this.newCampaignForm.get('image').patchValue(data.data.image.minPath);
        }
    }

    removePlayer(index): void {
        this.players.removeAt(index);
    }

    createCampaign(): void {
        if (this.newCampaignForm.invalid) {
            return;
        }

        const saveData = this.prepareDataForSaving();
        saveData['createdAt'] = firebase.firestore.FieldValue.serverTimestamp();

        this.loadingService.presentLoading(`Creating ${saveData.name}...`).then(() => {
            this.campaignsService.createCampaign(saveData).pipe(first()).subscribe(() => {
                this.loadingService.cancelLoading();
                this.navController.back();
            });
        });
    }

    updateCampaign(): void {
        if (this.newCampaignForm.invalid) {
            return;
        }

        const saveData = this.prepareDataForSaving();

        this.loadingService.presentLoading(`Saving ${saveData.name}...`).then(() => {
            this.campaignsService.updateCampaign(this.campaignId, saveData).pipe(first()).subscribe(() => {
                this.loadingService.cancelLoading();
                this.navController.back();
            });
        });
    }

    segmentChanged(evt) {
        this.selectedTab = evt.detail.value;
    }

    private prepareDataForSaving() {
        const data = {
            name: this.newCampaignForm.get('name').value,
            description: this.newCampaignForm.get('description').value,
            startTime: this.newCampaignForm.get('startTime').value || '',
            endTime: this.newCampaignForm.get('endTime').value || '',
            nextSession: this.newCampaignForm.get('nextSession').value || '',
            location: this.newCampaignForm.get('location').value || '',
            image: this.newCampaignForm.get('image').value,
            players: [],
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        this.players.controls.forEach(player => {
            data.players.push({
                id: player.get('id').value,
                username: player.get('username').value,
                firstName: player.get('firstName').value,
                lastName: player.get('lastName').value
            });
        });
        return data;
    }

    private resetForm(data): void {
        this.newCampaignForm = new FormGroup({
            name: new FormControl(data.name, Validators.required),
            description: new FormControl(data.description),
            startTime: new FormControl({value: data.startTime, disabled: true}),
            endTime: new FormControl({value: data.endTime, disabled: true}),
            nextSession: new FormControl(data.nextSession),
            location: new FormControl(data.location),
            image: new FormControl(data.image),
            players: new FormArray(this.createPlayerFormArray(data.players))
        });

        this.newCampaignForm.get('image').valueChanges.pipe(
            startWith('campaign-placeholder.png'),
            switchMap(img => this.fireStorage.getImage(img))
        ).subscribe(val => {
            this.campaignImage = val;
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
            endTime: data.endTime,
            location: data.location,
            image: data.image
        });

        this.players.clear(); // Clear the existing players so we can re-add everyone plus any new ones
        data.players.forEach(player => {
            this.players.push(this.createPlayer(player));
        });
    }

    private createPlayerFormArray(data): FormGroup[] {
        return data.map(player => this.createPlayer(player));
    }

    private createPlayer(player): FormGroup {
        return new FormGroup({
            id: new FormControl(player.id),
            username: new FormControl(player.username),
            firstName: new FormControl(player.firstName),
            lastName: new FormControl(player.lastName)
        });
    }

}
