import {Component} from '@angular/core';
import {ViewController, Toast, NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';

import {EventsService} from "../../../services/events.service";
import {BasePage} from "../../base.page";


@Component({
    templateUrl: './build/pages/events/add_event/add_event.page.html',
    directives: [FORM_DIRECTIVES]
})
export class AddEventPage extends BasePage {
    form:ControlGroup;
    name:AbstractControl;
    imgSrc:AbstractControl;
    text:AbstractControl;

    constructor(public es:EventsService, public viewCtrl:ViewController, fb:FormBuilder, public nav:NavController) {
        super();

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
                this.presentToast(this.nav, "Error: " + error);
            } else {
                this.dismiss();
            }
        });
    }

}
