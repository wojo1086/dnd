import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.sass']
})
export class AppComponent {

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar) {
        this.initializeApp();
    }

    initializeApp() {
        const elem = document.createElement('script');
        elem.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${environment.maps.apiKey}&libraries=places`);
        elem.setAttribute('type', 'text/javascript');
        document.getElementsByTagName('head')[0].appendChild(elem);

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
