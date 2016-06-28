import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {FirebaseService} from './firebase.service'
import {LogService} from "../services/log.service";
import {observableFirebaseObject, observableFirebaseArray} from './firebase.func'
import {Observable} from 'rxjs/Observable';
import {IUser, User} from '../model/user'

//https://webcake.co/using-firebase-3-in-angular-2-and-ionic-2/
@Injectable()
export class UserService {
    private fs:any;
    private events;
    public static user:IUser = null;

    constructor(events:Events, db:FirebaseService) {
        this.events = events;
        this.fs = db;
    }

    public loadUserData():void {
        this.fs.db.ref("users/" + this.fs.auth.currentUser.uid).once('value').then((snapshot)=> {
                if (snapshot.exists()) {
                    UserService.user = UserService.mapUser(snapshot.val());
                    for (var key in this.fs.auth.currentUser) {
                        if (this.fs.auth.currentUser[key] != null) {
                            UserService.user[key] = this.fs.auth.currentUser[key];
                        }
                    }
                    //check admin rights
                    this.fs.db.ref("admins/" + UserService.user.memberOf + "/" + this.fs.auth.currentUser.uid).once('value').then((snapshot3)=> {
                        if (snapshot3.exists()) {
                            UserService.user.isAdmin = true;
                        }
                    });
                    this.events.publish("user:loaded");
                }
            }
        )
    }

    public static getCurrentUser():any {
        return UserService.user;
    }

    public getUser(user_id):Observable < any > {
        return observableFirebaseObject(this.fs.db.ref("users/" + user_id));
    }

    public static mapUser(snapshot:any):IUser {
        let user = new User(snapshot.auto, snapshot.member_of, snapshot.displayName);
        if (typeof snapshot.photoURL !== 'undefined')
            user.photoURL = snapshot.photoURL;
        if (typeof snapshot.flatNumber !== 'undefined')
            user.flatNumber = snapshot.flatNumber;
        if (typeof snapshot.houseNumber !== 'undefined')
            user.houseNumber = snapshot.houseNumber;
        if (typeof snapshot.mobile1 !== 'undefined')
            user.mobile1 = snapshot.mobile1;
        if (typeof snapshot.mobile2 !== 'undefined')
            user.mobile2 = snapshot.mobile2;
        if (typeof snapshot.mail !== 'undefined')
            user.mail = snapshot.mail;
        LogService.logMessage("mapUser", user);
        return user;
    }


}
