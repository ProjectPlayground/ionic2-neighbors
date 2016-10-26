import {Component} from '@angular/core';
import {PushService} from "../../services/push.service";
import {LogService} from "../../services/log.service";
import {CallNumber} from "ionic-native";
import {BasePage} from "../base.page";
import {ToastController} from "ionic-angular";

@Component({
    templateUrl: 'start.page.html',
})
export class StartPage extends BasePage {

    constructor(private toastCtrl: ToastController) {
        super(toastCtrl);

    }

    private test(): void {
        CallNumber.callNumber('380630000000', true)
            .then(() => this.presentToast('Launched dialer!'))

    }

}
