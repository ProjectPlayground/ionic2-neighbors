import {IUser} from "./user";

export interface IMessage {
    $key?:string;
    text:string;
    user_id?:string;
    user?:IUser;
}

export class Message implements IMessage {
    text:string = "";

    constructor(text:string) {
        this.text = text;
    }
}
