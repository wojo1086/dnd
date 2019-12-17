import {Component, OnInit} from '@angular/core';
import {CampaignsService, ICampaign} from '../../services/campaigns/campaigns.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UtilitiesService} from '../../services/utilities/utilities.service';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.page.html',
    styleUrls: ['./campaigns.page.sass'],
})
export class CampaignsPage implements OnInit {

    campaigns = [];
    isLoading = false;

    constructor(private campaignsService: CampaignsService,
                private utilities: UtilitiesService,
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
        this.router.navigateByUrl('secure/edit-campaign');
    }

    editCampaign(campaign): void {
        this.router.navigateByUrl(`secure/campaign/${campaign.id}`);
    }

    private getData(): void {
        this.isLoading = true;
        this.campaignsService.getCampaigns().subscribe(res => {
                this.isLoading = false;
                this.campaigns = res.map(campaign => {
                    const data = {...campaign};
                    data.createdAtConverted = campaign.createdAt ? this.utilities.convertFirebaseTimestampToDate(campaign.createdAt) : '';
                    return data;
                });
                // this.campaigns = res.map(data => data.payload.doc);
                // this.campaigns = res.map(data => data.payload.doc.data());
            },
            err => {
                this.isLoading = false;
            });
    }

}
