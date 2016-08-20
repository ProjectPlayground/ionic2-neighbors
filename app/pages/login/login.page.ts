import {Page, NavController, Events, Toast} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {FirebaseService} from '../../services/firebase.service';
import {SignupPage} from "../signup/signup.page";
import {ValidationService} from "../../services/validator.service";
import {LogService} from "../../services/log.service";
import {AuthProviders, AuthMethods} from "angularfire2/angularfire2";
import {InAppBrowser} from 'ionic-native';
import {BasePage} from "../base.page";


@Page({
    templateUrl: 'build/pages/login/login.page.html',
    directives: [FORM_DIRECTIVES]
})
export class LoginPage extends BasePage {
    authForm:ControlGroup;
    login:AbstractControl;
    password:AbstractControl;
    nav:NavController;
    events:Events;
    db:any;

    constructor(nav:NavController, fb:FormBuilder, db:FirebaseService, events:Events) {
        this.nav = nav;
        this.db = db;
        this.events = events;

        this.authForm = fb.group({
            'login': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });

        this.login = this.authForm.controls['login'];
        this.password = this.authForm.controls['password'];

        this.login._value = "test@test.com";
        this.password._value = "123456";
    }

    public onLogin(event) {
        this.db.auth.signInWithEmailAndPassword(this.login.value, this.password.value).then((result)=> {
            var user = result.user;
            LogService.logMessage("Email user ", user);
        }).catch((error)=> {
            this.presentToast(this.nav, error);
            return;
        });
    }

    registerUserWithFacebook() {
        this.facebookLogin().then((success) => {
            LogService.logMessage(success.access_token);
            this.db.loginWithFacebookAccessToken(success);
        }, (error) => {
            this.presentToast(this.nav, error);
        });
    }

    facebookLogin() {
        return new Promise(function (resolve, reject) {
            var browserRef = InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=245599175811882&redirect_uri=http://balynsky.su/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf("http://balynsky.su/callback") === 0) {
                    browserRef.removeEventListener("exit", (event) => {
                    });
                    browserRef.close();
                    var responseParameters = ((event.url).split("#")[1]).split("&");
                    var parsedResponse = {};
                    for (var i = 0; i < responseParameters.length; i++) {
                        parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                    }
                    if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                        resolve(parsedResponse);
                    } else {
                        reject("Problem authenticating with Facebook");
                    }
                }
            });
            browserRef.addEventListener("exit", function (event) {
                reject("The Facebook sign in flow was canceled");
            });
        });
    }
    
    public registerUser(event) {
        this.nav.push(SignupPage);
    }

}


