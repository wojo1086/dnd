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
        this.router.navigateByUrl('secure/edit-campaign');
    }

    editCampaign(campaign): void {
        this.router.navigateByUrl(`secure/campaign/${campaign.id}`);
    }

    private getData(): void {
        this.isLoading = true;
        this.campaignsService.getCampaignsOnce().subscribe(res => {
                this.isLoading = false;
                this.campaigns = res.docs;
                this.campaigns = res.docs.map(doc => {
                    console.log(doc.data());
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        description: data.description,
                        createdAt: data.createdAt.seconds * 1000,
                        nextSession: !!data.nextSession ? new Date(data.nextSession) : '',
                        startTime: !!data.startTime ? new Date(data.startTime) : ''
                    };
                });
                // this.campaigns = res.map(data => data.payload.doc);
                // this.campaigns = res.map(data => data.payload.doc.data());
            },
            err => {
                this.isLoading = false;
            });
    }

}
