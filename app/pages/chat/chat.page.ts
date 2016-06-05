import {Page, Platform, NavController} from 'ionic-angular';
import {RoomItemPage} from  '../chat/room_item/room_item.page';
import {PrivateItemPage} from  '../chat/private_item/private_item.page';

@Page({
    templateUrl: 'build/pages/chat/chat.page.html',
})
export class ChatPage {
    type:string = "rooms";
    isAndroid:boolean = false;
    nav;
    rooms;
    privateRooms;

    constructor(platform:Platform, nav:NavController) {
        this.isAndroid = platform.is('android');
        this.nav = nav;
        this.rooms = [
            {
                img: "build\\img\\avatar.png",
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
        ];
        this.privateRooms = [
            {
                img: "build\\img\\avatar.png",
                friend: {
                    id: 123,
                    name: "Private room of friends"
                },
                message: {
                    text: "Text message"
                }
            }];
    }

    openChatRoom(id) {
        this.nav.push(RoomItemPage, {chatId: id});
    }

    openPrivateRoom(id) {
        this.nav.push(PrivateItemPage, {chatId: id});
    }

}
