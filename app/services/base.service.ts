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
        this.events.publish("loader:start",content);
    }

    protected hideLoading() {
        this.events.publish("loader:stop");
    }
}
