import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';

@Component({
    selector: 'places',
    templateUrl: './places.page.html',
    styleUrls: ['./places.page.sass'],
})
export class PlacesPage implements OnInit {
    @Input() location;
    autoCompleteItems = [];
    googleAutoComplete;

    constructor(private modalController: ModalController,
                private zone: NgZone) { }

    ngOnInit() {
        this.googleAutoComplete = new (window as any).google.maps.places.AutocompleteService();
        this.location.valueChanges.pipe(
            tap(() => this.autoCompleteItems = []),
            filter(search => search !== ''),
        ).subscribe(search => {
            this.googleAutoComplete.getPlacePredictions({input: search}, (predictions, status) => {
                this.zone.run(() => {
                    if (!!predictions) {
                        predictions.forEach(prediction => this.autoCompleteItems.push(prediction));
                    }
                });
            });
        });
    }

    selectLocation(location) {
        this.location.patchValue(location.description);
    }

    dismissModal(): void {
        this.modalController.dismiss();
    }

}
