export interface IGroup {
    $key?:string;
    name:string;
    img:string;
    members:any[];
}

export class Group implements IGroup {
    $key:string;
    name:string;
    img:string;
    members:any[];

    constructor(name:string) {
        this.name = name;
    }
}
