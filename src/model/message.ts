import {IUser} from "./user";

export interface IMessage {
    $key?:string;
    text:string;
    user_id?:string;
    user?:IUser;
    type:string;
}

export class Message implements IMessage {
    text:string = "";
    user_id:string = null;
    user:IUser = null;
    type:string = "in";

    constructor(text:string) {
        this.text = text;
    }
}
