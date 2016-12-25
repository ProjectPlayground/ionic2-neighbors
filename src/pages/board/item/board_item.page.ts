import {NavParams, NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {ChatService} from "../../../services/chat.service";
import {IRoom} from "../../../model/room";
import {Observable} from "rxjs/Observable";
import {IMessage} from "../../../model/message";
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../model/user";
import {LogService} from "../../../services/log.service";
import {NeighborItemPage} from "../../neighbors/neighbor_item/neighbor_item.page";
import {Keyboard} from "ionic-native";

@Component({
    selector: 'board-item-page',
    templateUrl: 'board_item.page.html',
})
export class BoardItemPage {
    private chat: IRoom;
    private messages: Observable<IMessage[]>;
    private user: IUser;
    private message;

    constructor(private data: ChatService, params: NavParams, private nav: NavController, private us: UserService) {
        this.chat = params.get("chatId");
        this.user = UserService.getCurrentUser();
        this.messages = data.getMessages("board_messages", this.chat.$key);
    }

    public sendMessage(message: string) {
        LogService.logMessage("BoardItemPage sendMessage " + this.chat.$key + " ", message);
        this.data.saveMessage("board_messages", this.chat.$key, message, null, ()=> {
            LogService.logMessage("BoardItemPage sendMessage success saved");
            this.message = '';
        }, false);
        Keyboard.close();

    }

    public openUser(message: IMessage) {
        LogService.logMessage("openUser ", message.user.$key);
        this.nav.push(NeighborItemPage, {"item": message.user});
    }

}
