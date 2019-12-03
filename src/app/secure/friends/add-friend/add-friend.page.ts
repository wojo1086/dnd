import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AddFriendService} from '../../../services/friends/add-friend/add-friend.service';
import {first} from 'rxjs/operators';
import {NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../../services/auth/auth.service';
import {LoadingService} from '../../../services/loading/loading.service';

@Component({
    selector: 'add-friend',
    templateUrl: './add-friend.page.html',
    styleUrls: ['./add-friend.page.sass'],
})
export class AddFriendPage implements OnInit {
    email: FormControl;

    constructor(private addFriendService: AddFriendService,
                private authService: AuthService,
                private navController: NavController,
                private loadingService: LoadingService,
                private toastController: ToastController) {
    }

    ngOnInit() {
        this.email = new FormControl('', Validators.required);
    }

    async add() {
        await this.loadingService.presentLoading(`Checking for ${this.email.value}...`);
        this.addFriendService.checkIfFriendExists(this.email.value).subscribe(async (res) => {
            this.loadingService.cancelLoading();
            if (res.empty) {
                this.showToast('Incorrect email address', 'danger');
            } else if (res.docs[0].ref.id === this.authService.currentUserId) {
                this.showToast(`You can't be friends you with yourself`, 'danger');
            } else {
                await this.loadingService.presentLoading(`Adding friend...`);
                this.continueWithAddingFriend(res.docs[0].ref.id);
            }
        });
    }

    private continueWithAddingFriend(id: string): void {
        this.addFriendService.addFriend(id).pipe(first()).subscribe(res => {
            this.loadingService.cancelLoading();
            this.showToast(`Added ${this.email.value}`, 'success');
            this.navController.back();
        });
    }

    private async showToast(message, color) {
        const toast = await this.toastController.create({
            message,
            position: 'bottom',
            duration: 3000,
            color
        });
        toast.present();
    }

}
