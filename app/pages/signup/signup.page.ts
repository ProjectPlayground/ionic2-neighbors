import {Page, NavController, Toast} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {TabsPage} from '../apptabs/apptabs';
import {FirebaseService} from "../../services/firebase.service";
import {ValidationService} from "../../services/validator.service";


@Page({
    templateUrl: 'build/pages/signup/signup.page.html',
    directives: [FORM_DIRECTIVES]
})
export class SignupPage {
    form:ControlGroup;
    login:AbstractControl;
    password:AbstractControl;

    constructor(public nav:NavController, fb:FormBuilder, public db:FirebaseService) {
        this.form = fb.group({
            'login': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
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

    private presentToast(message) {
        let toast = Toast.create({
            message: message,
            duration: 3000
        });

        toast.onDismiss(() => {
            console.log('Dismissed toast');
        });

        this.nav.present(toast);
    }

}
