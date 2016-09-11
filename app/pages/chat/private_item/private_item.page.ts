import {Component, ViewChild} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ChatService} from '../../../services/chat.service';
import {UserService} from '../../../services/user.service';
import {IRoom} from '../../../model/room';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {IUser} from '../../../model/user';
import {IMessage} from '../../../model/message';
import {LogService} from '../../../services/log.service';
import {Keyboard} from 'ionic-native/dist/index';

@Component({
    templateUrl: 'build/pages/chat/private_item/private_item.page.html',
    queries: {
        content: new ViewChild('content')
    }
})
export class PrivateItemPage {
    private chat:IRoom;
    private messages:Observable<IMessage[]>;
    private user:IUser;
    //private keyboardObservable = Observable.fromEvent(document, 'keyboardShown');

    constructor(private data:ChatService, params:NavParams) {
        this.chat = params.get("chatId");
        LogService.logMessage("PrivateItemPage chat: ", this.chat);
        this.user = UserService.getCurrentUser();
        this.messages = data.getMessages("private_messages", this.chat.$key);

        /*this.keyboardObservable
         .subscribe(data => {
         this.content.scrollToBottom(300);//300ms animation speed
         });*/

    }

    public sendMessage(message:string) {
        LogService.logMessage("PrivateItemPage sendMessage ", message);
        LogService.logMessage("PrivateItemPage chat ", this.chat);
        this.data.saveMessage("private_messages", this.chat.$key, message, this.chat.user_id, ()=> {
            LogService.logMessage("PrivateItemPage sendMessage success saved");
            message = '';
        });
    }

    public closeKeyboard() {
        Keyboard.close();
    }
}
