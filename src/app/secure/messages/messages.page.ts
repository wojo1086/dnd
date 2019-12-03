import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages/messages.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.sass'],
})
export class MessagesPage implements OnInit {

    constructor(private messagesService: MessagesService) { }

    ngOnInit() {
    }

    ionViewDidEnter(): void {
        this.messagesService.getMessages().pipe(first()).subscribe(res => {
            console.log(res);
        });
    }

}
