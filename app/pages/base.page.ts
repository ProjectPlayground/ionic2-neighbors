import {NavController, Toast} from 'ionic-angular';

export class BasePage {
    protected presentToast(nav:NavController, message:string, duration:number = 3000) {
        let toast = Toast.create({ 
            message: message,
            duration: duration
        });

        toast.onDismiss(() => {
            console.log('Dismissed toast');
        });

        nav.present(toast);
    }

}
