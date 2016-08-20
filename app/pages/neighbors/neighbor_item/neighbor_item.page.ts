import {Page, NavParams, NavController} from 'ionic-angular';
import {NeighborsService} from '../../../services/neighbors.service';
import {IUser} from "../../../model/user";
import {ChatService} from "../../../services/chat.service";
import {BasePage} from "../../base.page";
import {UserService} from "../../../services/user.service";
import {PrivateItemPage} from "../../chat/private_item/private_item.page";

@Page({
    templateUrl: 'build/pages/neighbors/neighbor_item/neighbor_item.page.html',
})
export class NeighborItemPage extends BasePage {
    private neighbor:IUser;
    private data:ChatService;
    private nav:NavController;
    private user:IUser;

    constructor(nav:NavController, navParams:NavParams, data:ChatService) {
        super();
        this.neighbor = navParams.get("item");
        this.data = data;
        this.nav = nav;
        this.user = UserService.getCurrentUser();
    }

    private addPrivateChat() {
        this.data.addPrivateRoom(this.neighbor, (error)=> {
            if (error) {
                this.presentToast(this.nav, "Error: " + error);
            }
        }, (chat_key)=> {
            this.data.getRoom("private_rooms/" + this.user.memberOf + "/" + UserService.getCurrentUser().uid + "/" + chat_key, (room)=> {
                this.nav.push(PrivateItemPage, {chatId: room});
            });
        })
    }
}
