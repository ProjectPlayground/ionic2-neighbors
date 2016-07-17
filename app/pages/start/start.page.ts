import {Page, Platform, NavController} from 'ionic-angular';
import {RoomItemPage} from  '../chat/room_item/room_item.page';
import {PrivateItemPage} from  '../chat/private_item/private_item.page';
import {ChatService} from "../../services/chat.service";
import {IRoom} from "../../model/room";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../services/user.service";
import {LogService} from "../../services/log.service";
import {IUser} from "../../model/user";

@Page({
    templateUrl: 'build/pages/start/start.page.html',
})
export class StartPage {

    constructor() {
    }

}
