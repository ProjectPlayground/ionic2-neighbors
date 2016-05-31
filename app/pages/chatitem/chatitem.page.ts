import {Page, Platform} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/chatitem/chatitem.page.html',
})
export class ChatItemPage {

    constructor(platform:Platform) {
        this.chat = {};
        this.chat.message = "First message";
        this.chat.friend = {
            name: "Max Lynx",
            picture: "build/img/avatar.png",
            lastSeen: 1452169351966
        };
    }

}
