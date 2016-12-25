import {IUser, User} from "./user";

export interface IEvent {
    $key?:string;
    name:string;
    text:string;
    img?:string;
    user_id:string;
    user:IUser;
}

export class Event implements IEvent {
    name:string;
    text:string;
    img:string;
    user_id:string;
    user:IUser = new User("","","");

    constructor(name:string, text:string, img:string) {
        this.name = name;
        this.text = text;
        this.img = img;
    }
}
