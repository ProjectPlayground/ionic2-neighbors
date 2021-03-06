import {Component} from "@angular/core";
import {ViewController, ToastController} from "ionic-angular";
import {FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {BasePage} from "../../base.page";
import {LogService} from "../../../services/log.service";


@Component({
    templateUrl: 'add_room.page.html'
})
export class AddBoardPage extends BasePage {
    name: AbstractControl;
    form = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
    });

    constructor(public data: ChatService, public viewCtrl: ViewController, toastCtrl: ToastController) {
        super(toastCtrl);
        this.name = this.form.controls['name'];
    }

    public dismiss() {
        this.viewCtrl.dismiss();
    }

    public addRoom($event) {
        LogService.logMessage("addRoom " + this.name.value);
        this.data.addBoardRoom(this.name.value, (error)=> {
            if (error) {
                this.presentToast("Error: " + error);
            } else {
                this.dismiss();
            }
        });
    }

}
