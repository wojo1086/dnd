import {Component, OnInit} from '@angular/core';
import {CampaignsService} from '../../services/campaigns/campaigns.service';
import {LoadingService} from '../../services/loading/loading.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.page.html',
    styleUrls: ['./campaigns.page.sass'],
})
export class CampaignsPage implements OnInit {

    campaigns = [];
    isLoading = false;

    constructor(private campaignsService: CampaignsService,
                private router: Router,
                private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ionViewWillEnter(): void {
        this.loadingService.presentLoading('Loading campaigns...');
        this.isLoading = true;
        this.campaignsService.getCampaigns().subscribe(res => {
            console.log(res);
            this.loadingService.cancelLoading();
            this.isLoading = false;
            this.campaigns = res.map(data => data.payload.doc.data());
        },
        err => {
            this.loadingService.cancelLoading();
            this.isLoading = false;
        });
    }

    async createNewCampaign() {

        this.router.navigateByUrl('new-campaign');

        // const data = {
        //     name: 'Campaign 1',
        //     description: 'This is a description.'
        // };
        // this.campaignsService.createCampaign(data).subscribe(res => {
        //     console.log(res);
        // });
    }

}
