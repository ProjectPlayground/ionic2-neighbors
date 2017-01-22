import {NavParams, ToastController, Content, ModalController} from "ionic-angular";
import {Keyboard, Toast} from "ionic-native";
import {Component, Input} from "@angular/core";
import {ChatService} from "../../../services/chat.service";
import {IRoom} from "../../../model/room";
import {Observable} from "rxjs/Observable";
import {IMessage} from "../../../model/message";
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../model/user";
import {LogService} from "../../../services/log.service";
import {BasePage} from "../../base.page";
import {ModalContentPage} from "../../../component/message.modal";

@Component({
    selector: 'room-item-page',
    templateUrl: 'room_item.page.html'
})
export class RoomItemPage extends BasePage {
    private chat: IRoom;
    private messages: Observable<IMessage[]>;
    private user: IUser;
    private message;

    constructor(protected toastCtrl: ToastController, public modalCtrl: ModalController, private data: ChatService, params: NavParams) {
        super(toastCtrl);
        this.chat = params.get("chatId");
        this.user = UserService.getCurrentUser();
        this.messages = data.getMessages("public_messages", this.chat.$key);
    }

    public sendMessage(message: string) {
        LogService.logMessage("RoomItemPage sendMessage ", message);
        this.data.saveMessage("public_messages", this.chat.$key, message, null, ()=> {
            LogService.logMessage("RoomItemPage sendMessage success saved");
            this.message = '';
        });
        Keyboard.close();
    }

    presentModal() {
        let modal = this.modalCtrl.create(ModalContentPage);
        modal.onDidDismiss(data => {
            if (data !== null) {
                this.sendMessage(data);
            }
        });
        modal.present();
    }


}
