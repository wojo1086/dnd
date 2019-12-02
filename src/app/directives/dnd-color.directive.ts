import {Directive, ElementRef} from '@angular/core';
import {AccountService} from '../services/account/account.service';

@Directive({
    selector: '[dndColor]'
})
export class DndColorDirective {

    constructor(private el: ElementRef, private accountService: AccountService) {
        accountService.isDM$.subscribe(res => {
            this.el.nativeElement.color = res ? 'primary' : 'secondary';
        });
    }

}
