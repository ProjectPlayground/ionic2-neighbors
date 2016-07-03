import {Page, NavController, Events} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {ValidationService} from "../../services/validator.service";
import {BasePage} from "../base.page";
import {UserService} from "../../services/user.service";
import {IUser, User} from "../../model/user";
import {LogService} from "../../services/log.service";
import {FirebaseService} from "../../services/firebase.service";


@Page({
    templateUrl: 'build/pages/profile/profile.page.html',
    directives: [FORM_DIRECTIVES]
})
export class ProfilePage extends BasePage {
    form:ControlGroup;

    displayName:AbstractControl;
    auto:AbstractControl;
    houseNumber:AbstractControl;
    flatNumber:AbstractControl;
    mail:AbstractControl;
    mobile1:AbstractControl;
    mobile2:AbstractControl;
    photoURL:AbstractControl;

    nav:NavController;
    us:UserService;
    events:Events;

    user:IUser;


    constructor(nav:NavController, fb:FormBuilder, us:UserService, events:Events, fs:FirebaseService) {
        super();
        this.nav = nav;
        this.us = us;
        this.events = events;
        this.user = UserService.getCurrentUser();
        if (this.user == null) {
            this.user = new User(null, null, null);
            this.user.photoURL = fs.auth.currentUser.photoURL;
            this.user.mail = fs.auth.currentUser.email;
            this.user.displayName = fs.auth.currentUser.displayName;
        }

        LogService.logMessage("ProfilePage constructor ", this.user);
        this.form = fb.group({
            'mail': [this.user.mail, Validators.compose([Validators.required, ValidationService.emailValidator])],
            'displayName': [this.user.displayName, Validators.compose([Validators.required, Validators.minLength(8)])],
            'auto': [this.user.auto],
            'houseNumber': [this.user.houseNumber],
            'flatNumber': [this.user.flatNumber, Validators.compose([Validators.required])],
            'mobile1': [this.user.mobile1, Validators.compose([Validators.required, Validators.minLength(8)])],
            'mobile2': [this.user.mobile2],
            'photoURL': [this.user.photoURL]
        });

        this.displayName = this.form.controls['displayName'];
        this.auto = this.form.controls['auto'];
        this.houseNumber = this.form.controls['houseNumber'];
        this.flatNumber = this.form.controls['flatNumber'];
        this.mail = this.form.controls['mail'];
        this.mobile1 = this.form.controls['mobile1'];
        this.mobile2 = this.form.controls['mobile2'];
        this.photoURL = this.form.controls['photoURL'];

    }

    private updateProfile() {
        this.user.displayName = this.displayName._value;
        this.user.auto = this.auto._value;
        this.user.houseNumber = this.houseNumber._value;
        this.user.flatNumber = this.flatNumber._value;
        this.user.mail = this.mail._value;
        this.user.mobile1 = this.mobile1._value;
        this.user.mobile2 = this.mobile2._value;
        this.user.photoURL = this.photoURL._value;

        this.us.updateUser(this.user, (error)=> {
            if (error) {
                this.presentToast(this.nav, error);
            } else {
                this.events.publish("user:login");
            }
        });
    }

    private changePhoto() {
        this.presentToast(this.nav, "changePhoto ");
    }

}
