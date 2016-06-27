import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {FirebaseService} from './firebase.service'
import {LogService} from "../services/log.service";
import {observableFirebaseObject, observableFirebaseArray} from './firebase.func'
import {Observable} from "rxjs/Observable";


//https://webcake.co/using-firebase-3-in-angular-2-and-ionic-2/
@Injectable()
export class UserService {
    private fs:any;
    private events;
    private static user = null;

    constructor(events:Events, db:FirebaseService) {
        this.events = events;
        this.fs = db;
    }

    public loadUserData() {
        this.fs.db.ref("users/" + this.fs.auth.currentUser.uid).once('value').then((snapshot)=> {
            var result = {};
            UserService.user = {};
            for (var key in snapshot.val()) UserService.user[key] = snapshot.val()[key];
            for (var key in this.fs.auth.currentUser) UserService.user[key] = this.fs.auth.currentUser[key];
            //LogService.logMessage("UserService user ", UserService.user);
            this.events.publish("user:loaded");
        })
    }

    public getCurrentUser() {
        return UserService.user;
    }

    public getUser(user_id):Observable<any> {
        return observableFirebaseObject(this.fs.db.ref("users/" + user_id));
    }

}
