import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {FirebaseService} from "./firebase.service";
import {Observable} from "rxjs/Observable";
import {IRoom, Room} from "../model/room";
import {LogService} from "./log.service";
import {UserService} from "./user.service";
import {Message, IMessage} from "../model/message";
import {IUser} from "../model/user";

@Injectable()
export class BaseService {

    constructor(public events:Events) {
    }

    protected showLoading(content) {
        this.events.publish("loader:start", content);
    }

    protected hideLoading() {
        this.events.publish("loader:stop");
    }

    protected observableFirebaseObject<T>(ref:any):Observable<T> {
        return Observable.create(function (observer:any) {
            function value(snapshot:any) {
                observer.next(snapshot.val());
            }

            ref.on('value', value);
            return function () {
                ref.off('value', value);
            }
        });
    }

    protected observableFirebaseArray<T>(ref:any, convert):Observable<T[]> {
        this.showLoading("Загрузка данных");
        let flag = true;
        let clazz = this;
        return Observable.create(function (observer:any) {
            // Looking for how to type this well.
            let arr:T[] = [];
            const keyFieldName = "$key";

            function child_added(snapshot:any, prevChildKey:string) {
                if (flag) {
                    flag = false;
                    clazz.hideLoading();
                }
                let child = convert(snapshot.val());
                child[keyFieldName] = snapshot.key;
                let prevEntry = findInArray(arr, (y:any) => y[keyFieldName] === prevChildKey);
                arr.splice(arr.indexOf(prevEntry) + 1, 0, child);
                observer.next(arr.slice()); // Safe copy
            }

            function child_changed(snapshot:any) {
                let key = snapshot.key;
                let child = convert(snapshot.val());
                // TODO replace object rather than mutate it?
                let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
                if (x) {
                    for (var k in child) x[k] = child[k];
                }
                observer.next(arr.slice()); // Safe copy
            }

            function child_removed(snapshot:any) {
                let key = snapshot.key;
                let child = convert(snapshot.val());
                let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
                if (x) {
                    arr.splice(arr.indexOf(x), 1);
                }
                observer.next(arr.slice()); // Safe copy
            }

            function child_moved(snapshot:any, prevChildKey:string) {
                let key = snapshot.key;
                let child = convert(snapshot.val());
                child[keyFieldName] = key;
                // Remove from old slot
                let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
                if (x) {
                    arr.splice(arr.indexOf(x), 1);
                }
                // Add in new slot
                let prevEntry = findInArray(arr, (y:any) => y[keyFieldName] === prevChildKey);
                if (prevEntry) {
                    arr.splice(arr.indexOf(prevEntry) + 1, 0, child);
                } else {
                    arr.splice(0, 0, child);
                }
                observer.next(arr.slice()); // Safe copy
            }

            // Start out empty, until data arrives
            observer.next(arr.slice()); // Safe copy

            ref.on('child_added', child_added);
            ref.on('child_changed', child_changed);
            ref.on('child_removed', child_removed);
            ref.on('child_moved', child_moved);

            return function () {
                ref.off('child_added', child_added);
                ref.off('child_changed', child_changed);
                ref.off('child_removed', child_removed);
                ref.off('child_moved', child_moved);
            }
        });
    }
}

function findInArray<T>(list:T[], predicate:Function) {
    for (var i = 0; i < list.length; i++) {
        const value:T = list[i];
        if (predicate.call(this, value, i, list)) {
            return value;
        }
    }
}

