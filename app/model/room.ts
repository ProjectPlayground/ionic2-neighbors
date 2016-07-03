import {IMessage} from "./message";
import {IUser} from "./user";

export interface IRoom {
    $key?:string;
    lastMessage?:IMessage;
    name:string;
    user_id?:string;
    user?:IUser;
}

export class Room implements IRoom {
    name:string = "";
    user_id:string;
    user:IUser;

    public lastMessage:IMessage;

    constructor(name:string) {
        this.name = name;
    }
}
