import {Page, NavController, ToastController} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {GroupsService} from '../../services/groups.service';
import {LogService} from "../../services/log.service";
import {IGroup} from "../../model/group";
import {FirebaseService} from "../../services/firebase.service";
import {UserService} from "../../services/user.service";
import {BasePage} from "../base.page";


@Component({
    templateUrl: 'build/pages/groups/groups.page.html',
})
export class GroupsPage extends BasePage {
    sourceGroups:IGroup[];
    groups:IGroup[];
    searchQuery:string;
    activeItem:IGroup = null;

    constructor(private data:GroupsService, private nav:NavController, private fs:FirebaseService, toastCtrl:ToastController) {
        super(toastCtrl);
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

}
