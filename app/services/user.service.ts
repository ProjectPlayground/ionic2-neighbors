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
                    UserService.user.$key = snapshot.key;
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
                } else {
                    this.events.publish("user:new");
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

    public updateUser(user:IUser, callback) {
        LogService.logMessage("updateUser " + user.$key);
        this.fs.db.ref("users/" + this.fs.auth.currentUser.uid).update({
                'displayName': user.displayName,
                'auto': user.auto,
                'flatNumber': user.flatNumber,
                'houseNumber': user.houseNumber,
                'mail': user.mail,
                'mobile1': user.mobile1,
                'photoURL' : user.photoURL,
                'mobile2': user.mobile2
            },
            callback);
    }

    getInvites():Observable<IUser[]> {
        var fs = this.fs;
        /*  return Observable.create(function (observer:any) {
         // Looking for how to type this well.
         let arr:any[] = [];
         const keyFieldName = "$key";
         // Start out empty, until data arrives
         observer.next(arr.slice()); // Safe copy

         function findInArray<T>(list:T[], predicate:Function) {
         for (var i = 0; i < list.length; i++) {
         const value:T = list[i];
         if (predicate.call(this, value, i, list)) {
         return value;
         }
         }
         }

         function child_added(skey:any, snapshot:any, prevChildKey:string) {
         LogService.logMessage("Events child_added");
         let child = snapshot;
         child[keyFieldName] = skey;
         let prevEntry = findInArray(arr, (y:any) => y[keyFieldName] === prevChildKey);
         arr.splice(arr.indexOf(prevEntry) + 1, 0, child);
         observer.next(arr.slice()); // Safe copy
         }

         function child_changed(skey:any, snapshot:any) {
         LogService.logMessage("Events child_changed");
         let key = skey;
         let child = snapshot;
         // TODO replace object rather than mutate it?
         let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
         if (x) {
         for (var k in child) x[k] = child[k];
         }
         observer.next(arr.slice()); // Safe copy
         }

         function child_removed(skey:any, snapshot:any) {
         LogService.logMessage("Events child_removed");
         let key = skey;
         let child = snapshot;
         let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
         if (x) {
         arr.splice(arr.indexOf(x), 1);
         }
         observer.next(arr.slice()); // Safe copy
         }

         LogService.logMessage("getInvites");

         fs.db.ref("invite/" + UserService.getCurrentUser().memberOf).on('child_added', (snapshot, prevChildKey)=> {
         LogService.logMessage("child_added", snapshot.val());
         fs.db.ref("users/" + snapshot.val()).once("value").then((snapshot2)=> {
         let user = UserService.mapUser(snapshot2.val());
         child_added(snapshot.key, user, prevChildKey);
         });
         });


         fs.db.ref("invite/" + UserService.getCurrentUser().memberOf).on('child_changed', (snapshot)=> {
         LogService.logMessage("child_changed", snapshot.val());
         fs.db.ref("users/" + snapshot.val()).once("value").then((snapshot2)=> {
         let user = UserService.mapUser(snapshot2.val());
         child_changed(snapshot.key, user);
         });
         });

         fs.db.ref("invite/" + UserService.getCurrentUser().memberOf).on('child_removed', (snapshot)=> {
         LogService.logMessage("child_removed", snapshot.val());
         fs.db.ref("users/" + snapshot.val()).once("value").then((snapshot2)=> {
         let user = UserService.mapUser(snapshot2.val());
         child_removed(snapshot.key, user);
         });
         })
         })
         */
        return Observable.create(function (observer:any) {
            // Looking for how to type this well.
            let arr:any[] = [];
            const keyFieldName = "$key";
            // Start out empty, until data arrives
            observer.next(arr.slice()); // Safe copy

            function findInArray<T>(list:T[], predicate:Function) {
                for (var i = 0; i < list.length; i++) {
                    const value:T = list[i];
                    if (predicate.call(this, value, i, list)) {
                        return value;
                    }
                }
            }

            function child_added(skey:any, snapshot:any) {
                LogService.logMessage("Events child_added");
                let child = snapshot;
                child[keyFieldName] = skey;
                arr.push(child);
                observer.next(arr.slice());
            }


            fs.db.ref("invite/" + UserService.getCurrentUser().memberOf).on('value', (snapshot)=> {
                LogService.logMessage("value", snapshot.val());
                arr = [];
                if (snapshot.exists()) {
                    Object.keys(snapshot.val()).forEach(function (userSnap) {
                        let userId = userSnap;
                        LogService.logMessage("getInvites ", userId);
                        fs.db.ref("users/" + userId).once("value").then((snapshot2)=> {
                            let user = UserService.mapUser(snapshot2.val());
                            LogService.logMessage("getInvites loadedUser ", user);
                            child_added(userId, user);
                        });
                    });
                } else {
                    observer.next(arr.slice());
                }
            });
        });
    }

    public updateUserGroup(user:IUser, group:string, callback) {
        LogService.logMessage("updateUserGroup " + user.$key);
        this.fs.db.ref("users/" + user.$key).update({'member_of': group}, callback);
        this.fs.db.ref("groups/" + group+"/members/"+user.$key).set('true', callback);

    }

}
