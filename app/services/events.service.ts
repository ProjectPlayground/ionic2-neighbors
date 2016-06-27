import {Injectable} from "@angular/core";

import {FirebaseService} from './firebase.service';
import {LogService} from "./log.service";
import {UserService} from './user.service';
import {observableFirebaseObject, observableFirebaseArray} from './firebase.func'
import {Observable} from 'rxjs/Observable';
import {Event} from '../model/event'
import {User} from '../model/user'

@Injectable()
export class EventsService {
    private fs;
    private us;

    constructor(fs:FirebaseService, us:UserService) {
        this.fs = fs;
        this.us = us;
    }

    public getEventsWithout():Observable<any> {
        var fs = this.fs;
        var us = this.us;
        return Observable.create(function (observer:any) {
            // Looking for how to type this well.
            let arr:any[] = [];
            const keyFieldName = "$$fbKey";
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
                console.log("add");
                let child = snapshot;
                child[keyFieldName] = skey;
                arr.push(child);
                observer.next(arr.slice()); // Safe copy
            }

            function child_changed(skey:any, snapshot:any) {
                console.log("update");
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
                let key = skey;
                let child = snapshot;
                let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
                if (x) {
                    arr.splice(arr.indexOf(x), 1);
                }
                observer.next(arr.slice()); // Safe copy
            }

            fs.db.ref("events/" + us.getCurrentUser().memberOf).limitToLast(10).on('child_added', snapshot=> {
                fs.db.ref("users/" + snapshot.val().user_id).once("value").then((snapshot2)=> {
                    let event = new Event(snapshot.val().name, snapshot.val().text, snapshot.val().img);
                    event.user = new User(snapshot2.val().auto, snapshot2.val().memberOf);
                    if (typeof snapshot2.val().img !== 'undefined')
                        event.user.img = snapshot2.val().img;
                    child_added(snapshot.key, event);
                });
            });


            fs.db.ref("events/" + us.getCurrentUser().memberOf).limitToLast(10).on('child_changed', (snapshot)=> {
                fs.db.ref("users/" + snapshot.val().user_id).once("value").then((snapshot2)=> {
                    let event = new Event(snapshot.val().name, snapshot.val().text, snapshot.val().img);
                    event.user = new User(snapshot2.val().auto, snapshot2.val().memberOf);
                    if (typeof snapshot2.val().img !== 'undefined')
                        event.user.img = snapshot2.val().img;
                    child_changed(snapshot.key, event);
                });
            });

            fs.db.ref("events/" + us.getCurrentUser().memberOf).limitToLast(10).on('child_removed', (snapshot)=> {
                child_removed(snapshot.key, event);
            })
        })
    }

}
