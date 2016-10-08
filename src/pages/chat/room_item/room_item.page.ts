import {NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {IRoom} from "../../../model/room";
import {Observable} from "rxjs/Observable";
import {IMessage} from "../../../model/message";
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../model/user";
import {LogService} from "../../../services/log.service";
import {Keyboard} from "ionic-native/dist/index";

@Component({
    selector: 'room-item-page',
    templateUrl: 'room_item.page.html',
})
export class RoomItemPage {
    private chat: IRoom;
    private messages: Observable<IMessage[]>;
    private user: IUser;
    private message;

    constructor(private data: ChatService, params: NavParams) {
        this.chat = params.get("chatId");
        this.user = UserService.getCurrentUser();
        this.messages = data.getMessages("public_messages", this.chat.$key);
    }

    private sendMessage(message: string) {
        LogService.logMessage("RoomItemPage sendMessage ", message);
        this.data.saveMessage("public_messages", this.chat.$key, message, null, ()=> {
            LogService.logMessage("RoomItemPage sendMessage success saved");
            this.message = '';
        });
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.close();
        }
    }

}
