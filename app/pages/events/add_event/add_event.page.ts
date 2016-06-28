import {Component} from '@angular/core';
import {ViewController, Toast, NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';

import {EventsService} from "../../../services/events.service";


@Component({
    templateUrl: './build/pages/events/add_event/add_event.page.html',
    directives: [FORM_DIRECTIVES]
})
export class AddEventPage {
    private es:EventsService;
    private nav:NavController;
    form:ControlGroup;
    name:AbstractControl;
    imgSrc:AbstractControl;
    text:AbstractControl;

    constructor(es:EventsService, public viewCtrl:ViewController, fb:FormBuilder, nav:NavController) {
        this.es = es;
        this.nav = nav;

        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'text': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'imgSrc': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });

        this.name = this.form.controls['name'];
        this.text = this.form.controls['text'];
        this.imgSrc = this.form.controls['imgSrc'];
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }

    private addEvent($event) {
        this.es.addEvent(this.name.value, this.text.value, this.imgSrc.value === '' ? null : this.imgSrc.value, (error)=> {
            if (error) {
                this.presentToast(error);
            } else {
                this.dismiss();
            }
        });
    }

    private presentToast(error) {
        let toast = Toast.create({
            message: 'Error ' + error,
            duration: 3000
        });

        toast.onDismiss(() => {
            console.log('Dismissed toast');
        });

        this.nav.present(toast);
    }

}
