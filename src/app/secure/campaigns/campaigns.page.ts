import {Component, OnInit} from '@angular/core';
import {CampaignsService, ICampaign} from '../../services/campaigns/campaigns.service';
import {LoadingService} from '../../services/loading/loading.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.page.html',
    styleUrls: ['./campaigns.page.sass'],
})
export class CampaignsPage implements OnInit {

    campaigns: ICampaign[] = [];
    isLoading = false;

    constructor(private campaignsService: CampaignsService,
                private router: Router,
                private loadingService: LoadingService) { }

    ngOnInit() {
        this.getData();
    }

    createNewCampaign() {
        this.router.navigateByUrl('new-campaign');
    }

    private async getData() {
        await this.loadingService.presentLoading('Loading campaigns...');
        this.isLoading = true;
        this.campaignsService.getCampaigns().subscribe(res => {
                console.log(res);
                this.loadingService.cancelLoading();
                this.isLoading = false;
                // this.campaigns = res.docs.map(data => data.data());
                this.campaigns = res.map(data => data.payload.doc.data());
            },
            err => {
                this.loadingService.cancelLoading();
                this.isLoading = false;
            });
    }

}
