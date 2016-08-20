import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {FirebaseService} from "./firebase.service";
import {Observable} from "rxjs/Observable";
import {IRoom, Room} from "../model/room";
import {LogService} from "./log.service";
import {UserService} from "./user.service";
import {Message, IMessage} from "../model/message";
import {IUser} from "../model/user";
import {BaseService} from "./base.service";

@Injectable()
export class ChatService extends BaseService {
    fs:FirebaseService;

    constructor(fs:FirebaseService, public events:Events) {
        super(events);
        this.fs = fs;
    }


    getRooms(rooms_name:string, message_name:string):Observable<IRoom[]> {
        this.showLoading("Загрузка комнат");
        LogService.logMessage("!!!! getRooms " + rooms_name);
        var fs = this.fs;
        let clazz = this;
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

            function child_added(skey:any, snapshot:any, prevChildKey:string) {
                LogService.logMessage("Events child_added");
                clazz.hideLoading();
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

            fs.db.ref(rooms_name).on('child_added', (snapshot, prevChildKey)=> {
                //Remove message not support
                let room = new Room(snapshot.val().name);
                room.user_id = snapshot.val().user_id;
                child_added(snapshot.key, room, prevChildKey);
                if (room.user_id != null) {
                    LogService.logMessage("room.user_id!=null");
                    fs.db.ref("users/" + room.user_id).once("value").then((snapshot2)=> {
                        room.user = UserService.mapUser(snapshot2.val());
                        LogService.logMessage("room.user " + snapshot.key + " :", room.user);
                        if (findInArray(arr, (y:any) => y[keyFieldName] === snapshot.key) == null) {
                            LogService.logMessage("room.user add");
                            child_added(snapshot.key, room, prevChildKey);
                        } else {
                            LogService.logMessage("room.user changed");
                            child_changed(snapshot.key, room);
                        }
                    });
                }
                fs.db.ref(message_name + snapshot.key).limitToLast(1).on("child_added", (snapshot2)=> {
                    room.lastMessage = new Message(snapshot2.val().text);
                    LogService.logMessage("room.lastMessage ", room.lastMessage);
                    if (findInArray(arr, (y:any) => y[keyFieldName] === snapshot.key) == null) {
                        child_added(snapshot.key, room, prevChildKey);
                    } else {
                        child_changed(snapshot.key, room);
                    }
                });
            });

            fs.db.ref(rooms_name).on('child_changed', (snapshot)=> {
                //Remove message not support
                let room = new Room(snapshot.val().name);
                room.user_id = snapshot.val().user_id;
                child_changed(snapshot.key, room);
                if (room.user_id != null) {
                    LogService.logMessage("room.user_id!=null");
                    fs.db.ref("users/" + room.user_id).once("value").then((snapshot2)=> {
                        room.user = UserService.mapUser(snapshot2.val());
                        LogService.logMessage("room.user " + snapshot.key + " :", room.user);
                        LogService.logMessage("room.user changed");
                        child_changed(snapshot.key, room);
                    });
                }
                fs.db.ref(message_name + snapshot.key).limitToLast(1).on("child_added", (snapshot2)=> {
                    let room = new Room(snapshot.val().name);
                    room.lastMessage = new Message(snapshot2.val().text);
                    LogService.logMessage("room.lastMessage ", room.lastMessage);
                    child_changed(snapshot.key, room);
                });
            });

            fs.db.ref(rooms_name).on('child_removed', (snapshot, prevChildKey)=> {
                child_removed(snapshot.key, snapshot.val());
            });
        })
    }

    getMessages(rooms_name:string, key:string):Observable<IMessage[]> {
        LogService.logMessage("!!!! getMessages " + rooms_name);
        var fs = this.fs;
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

            function child_added(skey:any, snapshot:any, prevChildKey:string) {
                LogService.logMessage("[Messages] Events child_added");
                let child = snapshot;
                child[keyFieldName] = skey;
                let prevEntry = findInArray(arr, (y:any) => y[keyFieldName] === prevChildKey);
                arr.splice(arr.indexOf(prevEntry) + 1, 0, child);
                observer.next(arr.slice()); // Safe copy
            }

            function child_changed(skey:any, snapshot:any) {
                LogService.logMessage("[Messages] Events child_changed");
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
                LogService.logMessage("[Messages] Events child_removed");
                let key = skey;
                let child = snapshot;
                let x = findInArray(arr, (y:any) => y[keyFieldName] === key);
                if (x) {
                    arr.splice(arr.indexOf(x), 1);
                }
                observer.next(arr.slice()); // Safe copy
            }

            fs.db.ref(rooms_name + '/' + key).on('child_added', (snapshot, prevChildKey)=> {
                //Remove message not support
                let message = new Message(snapshot.val().text);
                message.user_id = snapshot.val().user_id;
                child_added(snapshot.key, message, prevChildKey);
                if (message.user_id != null) {
                    LogService.logMessage("message.user_id!=null");
                    fs.db.ref("users/" + message.user_id).once("value").then((snapshot2)=> {
                        message.user = UserService.mapUser(snapshot2.val());
                        message.user.$key = snapshot2.key;
                        message.type = message.user.$key === UserService.getCurrentUser().$key ? "in" : "out";
                        LogService.logMessage("message.user " + snapshot.key + " :", message.user);
                        if (findInArray(arr, (y:any) => y[keyFieldName] === snapshot.key) == null) {
                            LogService.logMessage("message.user add");
                            child_added(snapshot.key, message, prevChildKey);
                        } else {
                            LogService.logMessage("message.user changed");
                            child_changed(snapshot.key, message);
                        }
                    });
                }
            });


            fs.db.ref(rooms_name + '/' + key).on('child_changed', (snapshot)=> {
                //Remove message not support
                let message = new Message(snapshot.val().text);
                message.user_id = snapshot.val().user_id;
                child_changed(snapshot.key, message);
                if (message.user_id != null) {
                    LogService.logMessage("message.user_id!=null");
                    fs.db.ref("users/" + message.user_id).once("value").then((snapshot2)=> {
                        message.user = UserService.mapUser(snapshot2.val());
                        message.user.$key = snapshot2.key;
                        message.type = (message.user.$key === UserService.getCurrentUser().$key) ? "in" : "out";
                        LogService.logMessage("message.user " + snapshot.key + " :", message.user);
                        LogService.logMessage("message.user changed");
                        child_changed(snapshot.key, message);
                    });
                }
            });

            fs.db.ref(rooms_name + '/' + key).on('child_removed', (snapshot, prevChildKey)=> {
                child_removed(snapshot.key, snapshot.val());
            });
        })
    }

    saveMessage(rooms_name:string, key:string, text:string, callback) {
        let message = new Message(text);
        message.user_id = UserService.getCurrentUser().uid;
        this.fs.db.ref(rooms_name + "/" + key).push().set(message, callback);

    }

    addPublicRoom(room_name:string, callback) {
        let room = new Room(room_name);
        room.user = null;
        room.user_id = UserService.getCurrentUser().uid;
        this.fs.db.ref("public_rooms/" + UserService.getCurrentUser().memberOf).push().set(room, callback);

    }

    addPrivateRoom(user:IUser, callback, success) {
        let room = new Room(user.displayName);
        room.user = null;
        room.user_id = user.$key;

        let db = this.fs.db.ref("private_rooms/" + UserService.getCurrentUser().memberOf + "/" + UserService.getCurrentUser().uid).push();
        db.set(room, callback);
        room.name = UserService.getCurrentUser().displayName;
        room.user_id = UserService.getCurrentUser().uid;
        this.fs.db.ref("private_rooms/" + UserService.getCurrentUser().memberOf + "/" + user.$key + "/" + db.key).set(room, callback);
        success(db.key);
    }

    getRoom(room_name:string, callback) {
        LogService.logMessage("getRoom: " + room_name);
        return this.fs.db.ref(room_name).once("value").then((snapshot)=> {
            let room = new Room(snapshot.val().name);
            room.user_id = snapshot.val().user_id;
            room.$key = snapshot.key;
            if (room.user_id != null) {
                LogService.logMessage("room.user_id!=null");
                this.fs.db.ref("users/" + room.user_id).once("value").then((snapshot2)=> {
                    room.user = UserService.mapUser(snapshot2.val());
                    callback(room);
                });
            } else {
                callback(room);
            }

        });
    }

}
