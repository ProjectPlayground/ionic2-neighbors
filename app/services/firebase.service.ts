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
        this.db = firebase.database();

        // as well as adding a reference to the Firebase
        // authentication method
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
        return new firebase.auth.FacebookAuthProvider();
    }

    public getGoogleProvider() {
        return new firebase.auth.GoogleAuthProvider();
    }
}
