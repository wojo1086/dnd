import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {first, switchMap} from 'rxjs/operators';
import {CampaignsService} from '../../services/campaigns/campaigns.service';

@Component({
    selector: 'campaign',
    templateUrl: './campaign.page.html',
    styleUrls: ['./campaign.page.sass'],
})
export class CampaignPage implements OnInit {
    campaignId: string;
    routeParams$ = this.route.paramMap;
    campaign;

    constructor(private route: ActivatedRoute,
                private campaignsService: CampaignsService) { }

    ngOnInit() {
        this.routeParams$.pipe(
            switchMap(params => {
                this.campaignId = params.get('campaignId');
                return this.campaignsService.getCampaign(this.campaignId);
            }),
            first()
        ).subscribe(data => {
            this.campaign = data;
        });
    }

}
