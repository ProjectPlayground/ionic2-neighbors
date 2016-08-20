import {Page, NavController, Toast} from 'ionic-angular';
import {GroupsService} from '../../services/groups.service';
import {LogService} from "../../services/log.service";
import {IGroup} from "../../model/group";
import {FirebaseService} from "../../services/firebase.service";
import {UserService} from "../../services/user.service";


@Page({
    templateUrl: 'build/pages/groups/groups.page.html',
})
export class GroupsPage {
    sourceGroups:IGroup[];
    groups:IGroup[];
    searchQuery:string;
    activeItem:IGroup = null;

    constructor(public data:GroupsService, public nav:NavController,public fs:FirebaseService) {
        this.searchQuery = '';
        //async implement in new version
        data.getGroups().subscribe(data=> {
            this.sourceGroups = this.groups = data;
            //render if filter is active
            this.getItems();
        });
    }

    getItems() {
        let q = this.searchQuery;
        this.groups = this.sourceGroups.filter((v) => {
            return (v.name != null && v.name.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1);
        })
    }

    doAction(item) {
        LogService.logMessage("doAction in GroupPage");
        if (this.activeItem === item) {
            this.data.removeInvite(item, UserService.getCurrentUser(), ()=> {
                this.presentToast("Заявка на вступление в группу отменена");
                this.activeItem = null;
            });
        } else {
            this.data.createInvite(item, ()=> {
                this.presentToast("Заявка на вступление в группу отправлена");
                this.activeItem = item;
            });
        }
    }

    logout() {
        this.fs.logout();
    }

    private presentToast(message) {
        let toast = Toast.create({
            message: message,
            duration: 3000
        });

        toast.onDismiss(() => {
            console.log('Dismissed toast');
        });

        this.nav.present(toast);
    }

}
