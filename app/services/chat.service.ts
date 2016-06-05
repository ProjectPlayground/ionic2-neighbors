import {Injectable} from "@angular/core";

@Injectable()
export class ChatService {
    constructor() {
    }

    getChat(chatId) {
        var chat = {};
        chat.friend = {
            2: 2,
            3: 3,
            4: 4,
            5: 5
        };
        chat.friend = this.getFriend(null);
        chat.messages = [
            {
                text: "Firebase has an excellent feature with out of the box authentication providers. It enables your app to use providers like simple login (email & password) or any other OAuth API of Facebook, Twitter, Google, LinkedIn etc. We will be choosing the simple email & password based authentication provider for our app.",
                type: "in",
                time: 1452169475360
            },
            {
                text: "hi",
                type: "in",
                time: 1452169485905,
                unread: true
            },
            {
                text: "hi!",
                type: "out",
                time: 1452169485905,
                unread: true
            }
        ];

        // Последняя активность
        //ref.child(chatId).once('value', function (friend) {
        //    chat.lastSeen = moment(friend.val().lastSeen).fromNow();
        //});
        chat.lastSeen = "12/03/2015";
        //// Сделать прочитанными
        //lastMessageRef.on("child_added", function (message) {
        //    var msg = message.val();

        //    if (msg.unread) {
        //        msg.unread = false;
        //        message.ref().remove();
        //        userRef.child('chats/' + chatId).push(msg);
        //    }
        //});
        //return chat;

        return chat;
    };

    getFriend(ref) {
        var friend = {
            name: "Max Lynx",
            picture: "build/img/avatar.png",
            lastSeen: 1452169351966
        };

        return friend;
    }
}
