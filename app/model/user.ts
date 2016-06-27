export interface IUser {
    $key?:string;
    auto:string;
    memberOf:string;
    img?:string;
}

export class User implements IUser {
    auto:string = "";
    memberOf:string = "";
    img:string = "build/img/avatar.png";

    constructor(auto:string, memberOf:string) {
        this.auto = auto;
        this.memberOf = memberOf;
    }
}
