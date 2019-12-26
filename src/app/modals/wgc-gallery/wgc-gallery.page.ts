import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {flatMap} from 'rxjs/operators';
import {FireStorageService} from '../../services/fire-storage/fire-storage.service';
import {from} from 'rxjs';

@Component({
    selector: 'wgc-gallery',
    templateUrl: './wgc-gallery.page.html',
    styleUrls: ['./wgc-gallery.page.sass'],
})
export class WgcGalleryPage implements OnInit {
    readonly imagesList = [
        'elf_playing_mandolin.jpg',
        'magic_ball_in_library.jpg',
        'small_waterfall_sun.jpg',
        'ruins_in_sunray.jpg',
        'snowy_castle_at_night.jpg',
        'village_near_waterfall.jpg'
    ];
    images: string[] = [];
    selectedImage = {
        fullPath: '',
        minPath: ''
    };

    constructor(private modalController: ModalController,
                private fireStorage: FireStorageService) { }

    ngOnInit() {
        from(this.imagesList).pipe(
            flatMap(img => this.fireStorage.getImage(img))
        ).subscribe(img => {
            this.images.push(img);
        });
    }

    dismissModal(): void {
        this.modalController.dismiss();
    }

    useImage(): void {
        this.modalController.dismiss({image: this.selectedImage});
    }

    selectImage(image: string, index: number) {
        this.selectedImage.fullPath = image;
        this.selectedImage.minPath = this.imagesList[index];
    }

}
