import {Injectable} from "@angular/core";

import {FirebaseService} from './firebase.service';
import {Events} from 'ionic-angular';
import {LogService} from "./log.service";
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import {IUser} from '../model/user'
import {IGroup, Group} from "../model/group";
import {BaseService} from "./base.service";

@Injectable()
export class GroupsService extends BaseService {
    constructor(public fs: FirebaseService, public us: UserService, events: Events) {
        super(events);
    }

    public getGroups(): Observable<IGroup[]> {
        return this.observableFirebaseArray<IGroup>(this.fs.db.ref("groups"), (data)=> {
            let group = new Group(data.name);
            group.img = data.img;
            return group;
        });
    }

    public getPushClientId(callback) {
        this.fs.db.ref("groups/" + UserService.getCurrentUser().memberOf + "/client_id").once('value').then((snapshot)=> {
                if (snapshot.exists()) {
                    callback(snapshot.val());
                }
            }
        )
    }


    public createInvite(group: IGroup, callback) {
        this.fs.db.ref("invite/" + group.$key + "/" + this.fs.auth.currentUser.uid).set("true", (error) => {
                if (error) {
                    LogService.logMessage("GroupsService create invite error " + error);
                } else {
                    callback();
                }
            }
        );
    }

    public removeInvite(group: IGroup, user: IUser, callback) {
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
