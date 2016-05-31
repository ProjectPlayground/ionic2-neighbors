import {Page, Platform, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {ChatItemPage} from  '../chatitem/chatitem.page';

@Page({
    templateUrl: 'build/pages/chat/chat.page.html',
    queries: {
        root: new ViewChild('root')
    }
})
export class ChatPage {
    type:string = "rooms";
    isAndroid:boolean = false;

    constructor(platform:Platform, nav:NavController) {
        this.isAndroid = platform.is('android');
        this.nav = nav;
        this.rooms = [
            {
                friend: {
                    id: 123,
                    name: "Friend name"
                },
                message: {
                    text: "Text message"
                }
            },
            {
                friend: {
                    id: 1254,
                    name: "Friend name 2"
                }
                ,
                message: {
                    text: "Text message 2"
                }
            }
        ]
        ;
    }

    openChatRoom(id) {
        this.nav.push(ChatItemPage);
    }
}
