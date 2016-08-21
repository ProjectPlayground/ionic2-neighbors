import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {LogService} from './log.service'


//https://webcake.co/using-firebase-3-in-angular-2-and-ionic-2/
@Injectable()
export class FirebaseService {
    public db:any;
    public auth:any;
    events;

    constructor(events:Events) {
        this.events = events;
        // still pointing to the base,
        // so that I can access other parts of my tree
        //noinspection TypeScriptUnresolvedVariable
        this.db = firebase.database();

        // as well as adding a reference to the Firebase
        // authentication method
        //noinspection TypeScriptUnresolvedVariable
        this.auth = firebase.auth();

        this.auth.onAuthStateChanged((user)=> {
            if (user) {
                this.events.publish('user:login');
            } else {
                events.publish('user:logout');
            }
        });

    }

    public isLogged() {
        return this.auth.currentUser != null;
    }

    public logout() {
        this.auth.signOut().then(()=> {
            this.events.publish("user:logout");
        }, function (error) {
            console.error(error);
        });
    }

    public getFacebookProvider() {
        //noinspection TypeScriptUnresolvedVariable
        return new firebase.auth.FacebookAuthProvider();
    }

    public getGoogleProvider() {
        //noinspection TypeScriptUnresolvedVariable
        return new firebase.auth.GoogleAuthProvider();
    }

    public loginWithFacebookAccessToken(token) {
        //noinspection TypeScriptUnresolvedVariable
        var credential = firebase.auth.FacebookAuthProvider.credential(token.access_token);
        // Sign in with the credential from the Facebook user.
        //noinspection TypeScriptUnresolvedVariable
        firebase.auth().signInWithCredential(credential).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
}
