import {ToastController} from "ionic-angular";
export class BasePage {

    constructor(protected toastCtrl: ToastController) {

    };

    protected presentToast(message: string, duration: number = 3000) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });

        toast.present();
    }

}
