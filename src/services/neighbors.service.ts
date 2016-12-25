import {Injectable} from "@angular/core";
import {Events} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {IUser} from "../model/user";
import {UserService} from "./user.service";
import {FirebaseService} from "./firebase.service";
import {BaseService} from "./base.service";

@Injectable()
export class NeighborsService extends BaseService {

    constructor(public fs:FirebaseService, events:Events) {
        super(events);
    }

    public getMembersOfCurrentGroup():Observable<IUser[]> {
        return this.observableFirebaseArray<IUser>(this.fs.db.ref("users").orderByChild("member_of").equalTo(UserService.user.memberOf), UserService.mapUser);
    }


}
