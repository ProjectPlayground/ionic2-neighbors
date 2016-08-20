import {Component} from '@angular/core';
import {ViewController, Toast, NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';

import {BasePage} from "../../../base.page";
import {ChatService} from "../../../../services/chat.service";
import {LogService} from "../../../../services/log.service";


@Component({
    templateUrl: './build/pages/chat/room_item/add_room/add_room.page.html',
    directives: [FORM_DIRECTIVES]
})
export class AddRoomPage extends BasePage {
    form:ControlGroup;
    name:AbstractControl;
    imgSrc:AbstractControl;
    text:AbstractControl;

    constructor(public data:ChatService, public viewCtrl:ViewController, fb:FormBuilder, public nav:NavController) {
        super();
        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        });
        this.name = this.form.controls['name'];
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }

    private addRoom($event) {
        LogService.logMessage("addRoom " + this.name.value);
        this.data.addPublicRoom(this.name.value, (error)=> {
            if (error) {
                this.presentToast(this.nav, "Error: " + error);
            } else {
                this.dismiss();
            }
        });
    }

}
