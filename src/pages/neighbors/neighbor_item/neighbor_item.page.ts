import {ToastController, NavParams, NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {IUser} from "../../../model/user";
import {ChatService} from "../../../services/chat.service";
import {BasePage} from "../../base.page";
import {UserService} from "../../../services/user.service";
import {PrivateItemPage} from "../../chat/private_item/private_item.page";

@Component({
    selector: 'neighbors-item-page',
    templateUrl: 'neighbor_item.page.html',
})
export class NeighborItemPage extends BasePage {
    private neighbor: IUser;
    private user: IUser;

    constructor(private nav: NavController, navParams: NavParams, private data: ChatService, toastCtrl: ToastController) {
        super(toastCtrl);
        this.neighbor = navParams.get("item");
        this.user = UserService.getCurrentUser();
    }

    public addPrivateChat() {
        this.data.addPrivateRoom(this.neighbor, (error)=> {
            if (error) {
                this.presentToast("Error: " + error);
            }
        }, (chat_key)=> {
            this.data.getRoom("private_rooms/" + this.user.memberOf + "/" + UserService.getCurrentUser().uid + "/" + chat_key, (room)=> {
                this.nav.push(PrivateItemPage, {chatId: room});
            });
        })
    }
}
