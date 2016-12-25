import {Component} from "@angular/core";
import {CallNumber} from "ionic-native";
import {BasePage} from "../base.page";
import {ToastController} from "ionic-angular";

@Component({
    templateUrl: 'start.page.html',
})
export class StartPage extends BasePage {

    constructor(protected toastCtrl: ToastController) {
        super(toastCtrl);

    }

    public test(): void {
        CallNumber.callNumber('380630000000', true)
            .then(() => this.presentToast('Launched dialer!'))

    }

}
