import {Page, NavController} from 'ionic-angular';
import {IUser} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {LogService} from "../../../services/log.service";
import {GroupsService} from "../../../services/groups.service";
import {BasePage} from "../../base.page";
import {Group} from "../../../model/group";

@Page({
    templateUrl: 'build/pages/neighbors/invites/invites.page.html',
})
export class InvitesPage extends BasePage {
    us:UserService;
    gs:GroupsService;
    sourceUsers:IUser[];
    users:IUser[];
    searchQuery:string;
    nav:NavController;

    constructor(nav:NavController, us:UserService, gs:GroupsService) {
        super();
        this.searchQuery = '';
        this.us = us;
        this.gs = gs;
        this.nav = nav;
        us.getInvites().subscribe(data=> {
            LogService.logMessage("InvitesPage getInvites", data);
            this.sourceUsers = this.users = data;
            this.getItems();
        });

    }

    private getItems() {
        let q = this.searchQuery;
        this.users = this.sourceUsers.filter((v) => {
            return (v.displayName.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1);

        })
    }

    private acceptInvite(user) {
        LogService.logMessage("acceptInvite user: ", user);
        this.us.updateUserGroup(user, UserService.getCurrentUser().memberOf, (error)=> {
            if (error) {
                this.presentToast(this.nav, error);
            } else {
                let gr = new Group(null);
                gr.$key = UserService.getCurrentUser().memberOf;
                LogService.logMessage("acceptInvite [removeInvite} ");
                this.gs.removeInvite(gr, user, ()=> {
                    //success
                    LogService.logMessage("acceptInvite success");
                });
            }
        })
    }

}
