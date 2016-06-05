import {Page, Platform, NavParams} from 'ionic-angular';
import {ChatService} from '../../../services/chat.service';

@Page({
    templateUrl: 'build/pages/chat/room_item/room_item.page.html',
})
export class RoomItemPage {
    chat;
    profileImageURL;

    constructor(platform:Platform, data:ChatService, params: NavParams) {
        this.chat = data.getChat(params.get("chatId"));
        this.profileImageURL = 'build/img/avatar.png';
    }

}
