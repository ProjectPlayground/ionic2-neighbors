import {Component} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
    selector: 'loading-modal',
    template: `
        <div class="container" [ngClass]="{'busy': isBusy}">
            <div class="backdrop"></div>
            <ion-spinner></ion-spinner>
            <div class="content">{{content}}</div>
        </div>
`,
    directives: [IONIC_DIRECTIVES]
})
export class LoadingModal {
    private isBusy;
    private content;

    constructor() {
        this.isBusy = false;
    }

    show(content) {
        this.isBusy = true;
        this.content = content;
    }

    hide() {
        this.isBusy = false;
        this.content = '';
    }

}