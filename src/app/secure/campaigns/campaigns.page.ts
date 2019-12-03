import {Component, OnInit} from '@angular/core';
import {CampaignsService, ICampaign} from '../../services/campaigns/campaigns.service';
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
                private router: Router) { }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.campaigns = [];
    }

    ionViewDidEnter() {
        this.getData();
    }

    createNewCampaign() {
        this.router.navigateByUrl('secure/new-campaign');
    }

    editCampaign(campaign): void {
        console.log(campaign.id);
    }

    private getData(): void {
        this.isLoading = true;
        this.campaignsService.getCampaignsOnce().subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.campaigns = res.docs;
                // this.campaigns = res.map(data => data.payload.doc);
                // this.campaigns = res.map(data => data.payload.doc.data());
            },
            err => {
                this.isLoading = false;
            });
    }

}
