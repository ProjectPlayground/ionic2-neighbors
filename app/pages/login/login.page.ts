import {Page, NavController, Events} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {FirebaseService} from '../../services/firebase.service';

@Page({
    templateUrl: 'build/pages/login/login.page.html',
    directives: [FORM_DIRECTIVES]
})
export class LoginPage {
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
            'login': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });

        this.login = this.authForm.controls['login'];
        this.password = this.authForm.controls['password'];

        this.login._value = "test@test.com";
        this.password._value = "123456";}

    public onLogin(event) {
        this.db.auth.signInWithEmailAndPassword(this.login.value, this.password.value).then((result)=> {
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log("Email user " + user);
        }).catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
            return;
        });
    }

    registerUserWithFacebook() {
        var provider = this.db.getFacebookProvider();
        this.db.auth.signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            var user = result.user;
            // ...
            console.log("Facebook user " + user);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            this.events.publish("user:logout");
            console.error(error);
        });

    }

    registerUserWithGoogle() {
        var provider = this.db.getGoogleProvider;
        this.db.auth.signInWithPopup(provider).then((result)=> {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log("Google user " + user);
        }).catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            this.events.publish("user:logout");
            console.error(error);
        });
    }

}


