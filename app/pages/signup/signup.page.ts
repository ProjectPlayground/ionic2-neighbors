import {Page, NavController, ToastController} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {
    REACTIVE_FORM_DIRECTIVES,
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
    AbstractControl
} from '@angular/forms';
import {TabsPage} from '../apptabs/apptabs';
import {FirebaseService} from "../../services/firebase.service";
import {ValidationService} from "../../services/validator.service";
import {BasePage} from "../base.page";


@Component({
    templateUrl: 'build/pages/signup/signup.page.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class SignupPage extends BasePage {
    form:FormGroup;
    login:AbstractControl;
    password:AbstractControl;

    constructor(public nav:NavController, fb:FormBuilder, public db:FirebaseService, private toastCtrl:ToastController) {
        super(toastCtrl);

        this.form = new FormGroup({
            login: new FormControl('', Validators.compose([Validators.required, ValidationService.emailValidator])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
        });

        this.login = this.form.controls['login'];
        this.password = this.form.controls['password'];
    }

    onSignup(event) {
        this.db.auth.createUserWithEmailAndPassword(this.login.value, this.password.value).catch(function (error) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        this.presentToast("The new user account cannot be created because the email is already in use.");
                        break;
                    case "INVALID_EMAIL":
                        this.presentToast("The specified email is not a valid email.");
                        break;
                    default:
                        this.presentToast("Error creating user: " + error);
                }
            } else {
                this.presentToast("Successfully created user account");
            }
        });
    }

}
