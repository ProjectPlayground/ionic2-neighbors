import {Injectable} from "@angular/core";
import {FirebaseService} from "./firebase.service";
import {Observable} from "rxjs/Observable";
import {IRoom, Room} from "../model/room";
import {LogService} from "./log.service";
import {UserService} from "./user.service";
import {Message} from "../model/message";

@Injectable()
export class ChatService {
    fs:FirebaseService;

    constructor(fs:FirebaseService) {
        this.fs = fs;
    }


    getRooms(rooms_name:string, message_name:string):Observable<IRoom[]> {
        LogService.logMessage("!!!! getRooms " + rooms_name);
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

            fs.db.ref(rooms_name + UserService.getCurrentUser().memberOf).on('child_added', (snapshot, prevChildKey)=> {
                //Remove message not support
                let room = new Room(snapshot.val().name);
                room.user_id = snapshot.val().user_id;
                child_added(snapshot.key, room, prevChildKey);
                if (room.user_id != null) {
                    LogService.logMessage("room.user_id!=null");
                    fs.db.ref("users/" + room.user_id).once("value").then((snapshot2)=> {
                        room.user = UserService.mapUser(snapshot2.val());
                        LogService.logMessage("room.user "+snapshot.key+" :", room.user);
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


            fs.db.ref(rooms_name + UserService.getCurrentUser().memberOf).on('child_changed', (snapshot)=> {
                //Remove message not support
                let room = new Room(snapshot.val().name);
                room.user_id = snapshot.val().user_id;
                child_changed(snapshot.key, room);
                if (room.user_id != null) {
                    LogService.logMessage("room.user_id!=null");
                    fs.db.ref("users/" + room.user_id).once("value").then((snapshot2)=> {
                        room.user = UserService.mapUser(snapshot2.val());
                        LogService.logMessage("room.user "+snapshot.key+" :", room.user);
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

            fs.db.ref(rooms_name + UserService.getCurrentUser().memberOf).on('child_removed', (snapshot, prevChildKey)=> {
                child_removed(snapshot.key, snapshot.val());
            });
        })
    }

    getChat(chatId) {
        var chat = {};
        chat.friend = {
            2: 2,
            3: 3,
            4: 4,
            5: 5
        };
        chat.friend = this.getFriend(null);
        chat.messages = [
            {
                text: "Firebase has an excellent feature with out of the box authentication providers. It enables your app to use providers like simple login (email & password) or any other OAuth API of Facebook, Twitter, Google, LinkedIn etc. We will be choosing the simple email & password based authentication provider for our app.",
                type: "in",
                time: 1452169475360
            },
            {
                text: "hi",
                type: "in",
                time: 1452169485905,
                unread: true
            },
            {
                text: "hi!",
                type: "out",
                time: 1452169485905,
                unread: true
            }
        ];

        // Последняя активность
        //ref.child(chatId).once('value', function (friend) {
        //    chat.lastSeen = moment(friend.val().lastSeen).fromNow();
        //});
        chat.lastSeen = "12/03/2015";
        //// Сделать прочитанными
        //lastMessageRef.on("child_added", function (message) {
        //    var msg = message.val();

        //    if (msg.unread) {
        //        msg.unread = false;
        //        message.ref().remove();
        //        userRef.child('chats/' + chatId).push(msg);
        //    }
        //});
        //return chat;

        return chat;
    };

    getFriend(ref) {
        var friend = {
            name: "Max Lynx",
            picture: "build/img/avatar.png",
            lastSeen: 1452169351966
        };

        return friend;
    }
}
