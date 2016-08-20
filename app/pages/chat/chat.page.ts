import {Page, Platform, NavController, Modal} from 'ionic-angular';
import {RoomItemPage} from  '../chat/room_item/room_item.page';
import {PrivateItemPage} from  '../chat/private_item/private_item.page';
import {ChatService} from "../../services/chat.service";
import {IRoom} from "../../model/room";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../services/user.service";
import {LogService} from "../../services/log.service";
import {IUser} from "../../model/user";
import {AddRoomPage} from "./room_item/add_room/add_room.page";
import {BasePage} from "../base.page";

@Page({
    templateUrl: 'build/pages/chat/chat.page.html',
})
export class ChatPage extends BasePage{
    user:IUser;
    type:string = "rooms";
    isAndroid:boolean = false;
    rooms:Observable<IRoom[]>;
    privateRooms:Observable<IRoom[]>;

    constructor(platform:Platform, public nav:NavController, cs:ChatService) {
        this.isAndroid = platform.is('android');
        this.user = UserService.getCurrentUser();
        this.rooms = cs.getRooms("public_rooms/" + this.user.memberOf, "public_messages/");
        this.privateRooms = cs.getRooms("private_rooms/" + this.user.memberOf + "/" + this.user.uid + "/", "private_messages/");
    }

    openChatRoom(id) {
        this.nav.push(RoomItemPage, {chatId: id});
    }

    openPrivateRoom(id) {
        this.nav.push(PrivateItemPage, {chatId: id});
    }

    createPrivateTopic() {
        LogService.logMessage("createPrivateTopic");
        this.presentToast(this.nav, "Кнопка будет активна в след. версии приложения. Написать сообщение можно через список соседей")
    }

    createPublicTopic() {
        let modal = Modal.create(AddRoomPage);
        this.nav.present(modal);
    }

}
