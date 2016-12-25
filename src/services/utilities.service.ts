import {Injectable} from "@angular/core";
import {Events} from "ionic-angular";
import {UserService} from "./user.service";
import {FirebaseService} from "./firebase.service";
import {BaseService} from "./base.service";
import {LogService} from "./log.service";

@Injectable()
export class UtilitiesService extends BaseService {

    constructor(public fs:FirebaseService, events:Events) {
        super(events);
    }

    public getUtilities(callback) {
        let ref = this.fs.db.ref("utilities/" + UserService.getCurrentUser().memberOf + "/value");
        ref.on('value', function (snapshot) {
            LogService.logMessage("UtilitiesService getUtilities ", snapshot.val());
            callback(snapshot.val());
        });
    }


}
