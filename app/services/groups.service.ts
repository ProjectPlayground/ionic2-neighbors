import {Injectable} from "@angular/core";

import {FirebaseService} from './firebase.service';
import {LogService} from "./log.service";
import {UserService} from './user.service';
import {observableFirebaseObject, observableFirebaseArray} from './firebase.func'
import {Observable} from 'rxjs/Observable';
import {Event} from '../model/event'
import {User, IUser} from '../model/user'
import {IGroup, Group} from "../model/group";

@Injectable()
export class GroupsService {
    private fs;
    private us;

    constructor(fs:FirebaseService, us:UserService) {
        this.fs = fs;
        this.us = us;
    }

    public getGroups():Observable<IGroup[]> {
        return observableFirebaseArray<IGroup>(this.fs.db.ref("groups"), (data)=> {
            let group = new Group(data.name);
            group.img = data.img;
            return group;
        });
    }

    public createInvite(group:IGroup, callback) {
        this.fs.db.ref("invite/" + group.$key + "/" + this.fs.auth.currentUser.uid).set("true", (error) => {
                if (error) {
                    LogService.logMessage("GroupsService create invite error " + error);
                } else {
                    callback();
                }
            }
        );
    }

    public removeInvite(group:IGroup, user:IUser, callback) {
        let ref = this.fs.db.ref("invite/" + group.$key + "/" + user.$key);
        ref.on('value', function (snapshot) {
            //http://stackoverflow.com/questions/11633008/firebase-child-removed-not-being-called
            if (snapshot.val() == null) {
                LogService.logMessage("GroupsService invite remove");
                callback();
            }
        });
        ref.remove();
    }

}
