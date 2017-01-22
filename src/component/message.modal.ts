import {ViewController, NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {Autosize} from 'ionic2-autosize';

@Component({
    template: `
<ion-header>
    <ion-toolbar>
        <ion-title>
            Сообщение
        </ion-title>
        <ion-buttons start>
            <button ion-button (click)="dismiss()">
                <span ion-text color="primary" showWhen="ios">Закрыть</span>
                <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
            </button>
        </ion-buttons>
        <ion-buttons end>
            <button ion-button (click)="send()">
                <span ion-text color="primary" showWhen="ios">Отправить</span>
                <ion-icon name="md-send" showWhen="android,windows"></ion-icon>
            </button>
        </ion-buttons>
    </ion-toolbar>
</ion-header>

<ion-content>
    <ion-list>
        <ion-item>
            <ion-textarea rows="5" autosize placeholder="Введите сообщение" clearInput [(ngModel)]="message"></ion-textarea>
        </ion-item>
    </ion-list>
</ion-content>
`
})
export class ModalContentPage {
    message;

    constructor(public viewCtrl: ViewController) {
    }

    dismiss() {
        this.viewCtrl.dismiss(null);
    }

    send() {
        if (this.message !== '') {
            this.viewCtrl.dismiss(this.message);
        } else {
            this.dismiss();
        }
    }
}