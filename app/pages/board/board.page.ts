import {Page, Platform, NavController, ToastController} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
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
import {AddBoardPage} from "./add_room/add_room.page";
import {BoardItemPage} from "./item/board_item.page";

@Component({
    templateUrl: 'build/pages/board/board.page.html',
})
export class BoardPage extends BasePage {
    user:IUser;
    rooms:Observable<IRoom[]>;

    constructor(public nav:NavController, cs:ChatService, toastCtrl:ToastController) {
        super(toastCtrl);
        this.user = UserService.getCurrentUser();
        this.rooms = cs.getRooms("board_rooms/" + this.user.memberOf, "board_messages/");
    }

    openRoom(id) {
        LogService.logMessage("openBoardRoom id=", id);
        this.nav.push(BoardItemPage, {chatId: id});
    }

    createTopic() {
        this.nav.push(AddBoardPage);
    }

}
