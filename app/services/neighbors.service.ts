import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {IUser} from "../model/user";
import {UserService} from "./user.service";
import {observableFirebaseArray} from "./firebase.func";
import {FirebaseService} from "./firebase.service";

@Injectable()
export class NeighborsService {
    private fs:FirebaseService;

    constructor(fs:FirebaseService) {
        this.fs = fs;
    }

    public getMembersOfCurrentGroup():Observable<IUser[]> {
        return observableFirebaseArray<IUser>(this.fs.db.ref("users").orderByChild("member_of").equalTo(UserService.user.memberOf), UserService.mapUser);
    }


}
