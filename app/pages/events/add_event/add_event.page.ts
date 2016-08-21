import {Component} from '@angular/core';
import {ViewController, ToastController} from 'ionic-angular';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup,Validators,FormBuilder,AbstractControl} from '@angular/forms';


import {EventsService} from "../../../services/events.service";
import {BasePage} from "../../base.page";


@Component({
    templateUrl: './build/pages/events/add_event/add_event.page.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AddEventPage extends BasePage {
    name:AbstractControl;
    text:AbstractControl;
    imgSrc:AbstractControl;

    eventForm = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        text: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        imgSrc: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))

    });


    constructor(public es:EventsService, public viewCtrl:ViewController, public toastCtrl:ToastController) {
        super(toastCtrl);

        this.name = this.eventForm.controls['name'];
        this.text = this.eventForm.controls['text'];
        this.imgSrc = this.eventForm.controls['imgSrc'];
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }

    private addEvent($event) {
        this.es.addEvent(this.name.value, this.text.value, this.imgSrc.value === '' ? null : this.imgSrc.value, (error)=> {
            if (error) {
                this.presentToast("Error: " + error);
            } else {
                this.dismiss();
            }
        });
    }

}
