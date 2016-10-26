import {NavController, Events, ToastController} from 'ionic-angular';
import {Component} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {SignupPage} from "../signup/signup.page";
import {ValidationService} from "../../services/validator.service";
import {LogService} from "../../services/log.service";
import {InAppBrowser} from 'ionic-native';
import {BasePage} from "../base.page";
import {UserService} from "../../services/user.service";


@Component({
    selector: 'login-page',
    templateUrl: 'login.page.html'
})
export class LoginPage extends BasePage {
    login: AbstractControl;
    password: AbstractControl;

    loginForm = new FormGroup({
        login: new FormControl('test@test.com', Validators.compose([Validators.required, ValidationService.emailValidator])),
        password: new FormControl('123456', Validators.compose([Validators.required, Validators.minLength(8)]))
    });

    constructor(private nav: NavController, private db: FirebaseService, private events: Events, toastCtrl: ToastController, private us: UserService) {
        super(toastCtrl);
        this.login = this.loginForm.controls['login'];
        this.password = this.loginForm.controls['password'];
    }

    private onLogin(event) {
        this.db.auth.signInWithEmailAndPassword(this.login.value, this.password.value).then((result)=> {
            var user = result.user;
            LogService.logMessage("Email user ", user);
        }).catch((error)=> {
            this.presentToast(error);
            return;
        });
    }

    private registerUserWithFacebook() {
        if (window.cordova) {
            this.facebookLogin().then((success) => {
                LogService.logMessage(success);
                this.db.loginWithFacebookAccessToken(success);
            }, (error) => {
                this.presentToast(error);
            });
        } else {
            var provider = this.db.getFacebookProvider();
            this.db.auth.signInWithPopup(provider).then((result) => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                var user = result.user;
                LogService.logMessage("Facebook user ", user);
            }).catch((error) => {
                this.events.publish("user:logout");
                this.presentToast(error);
            });
        }
    }

    private facebookLogin() {
        return new Promise(function (resolve, reject) {
            var browserRef = cordova.InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=245599175811882&redirect_uri=http://balynsky.su/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
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

    private registerUser(event) {
        this.nav.push(SignupPage);
    }

}


