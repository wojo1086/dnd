import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
import {environment} from '../../../environments/environment';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.sass'],
})
export class MapsPage implements OnInit {
    @Input() title: string;
    @ViewChild('map', {static: true}) mapElement: ElementRef;
    map: GoogleMap;

    constructor(private modalController: ModalController, private geoLocation: Geolocation) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.loadMap();
    }

    dismissModal(): void {
        this.map.remove();
        this.modalController.dismiss();
    }

    loadMap() {
        const mapId = document.getElementById('map_canvas');
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': environment.maps.apiKey,
            'API_KEY_FOR_BROWSER_DEBUG': environment.maps.apiKey
        });

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create(this.mapElement.nativeElement);

        // const marker: Marker = this.map.addMarkerSync({
        //     title: 'Ionic',
        //     icon: 'blue',
        //     animation: 'DROP',
        //     position: {
        //         lat: 43.0741904,
        //         lng: -89.3809802
        //     }
        // });
        // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //     console.log('clicked');
        // });
    }

}
