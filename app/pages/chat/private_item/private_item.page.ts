import {Page, Platform, NavParams} from 'ionic-angular';
import {ChatService} from '../../../services/chat.service';

@Page({
    templateUrl: 'build/pages/chat/private_item/private_item.page.html',
})
export class PrivateItemPage {
    chat;
    profileImageURL;

    constructor(platform:Platform, data:ChatService, params: NavParams) {
        this.chat = data.getChat(params.get("chatId"));
        this.profileImageURL = 'build/img/avatar.png';
    }

}
