import {ToastController, NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {NeighborItemPage} from "../neighbors/neighbor_item/neighbor_item.page";
import {NeighborsService} from "../../services/neighbors.service";
import {IUser} from "../../model/user";
import {UserService} from "../../services/user.service";
import {InvitesPage} from "./invites/invites.page";
import {LogService} from "../../services/log.service";
import {BasePage} from "../base.page";

@Component({
    templateUrl: 'neighbors.page.html',
})
export class NeighborsPage extends BasePage {
    us:IUser;
    sourceNeighbors:IUser[];
    neighbors:IUser[];
    searchQuery:string;

    constructor(private data:NeighborsService, private nav:NavController, toastCtrl:ToastController) {
        super(toastCtrl);
        this.us = UserService.getCurrentUser();
        this.searchQuery = '';
        this.data.getMembersOfCurrentGroup().subscribe(data=> {
            this.sourceNeighbors = this.neighbors = data;
            this.getItems();
        });
    }

    public clearFilter(){
        this.neighbors = this.sourceNeighbors;
    }

    private getItems() {
        let q = this.searchQuery;
        LogService.logMessage("NeighborsPage getItems ",q);
        this.neighbors = this.sourceNeighbors.filter((v) => {
            LogService.logMessage("sourceNeighbors.filter ", v);
            if (
                (v.displayName != null && v.displayName.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1) ||
                // John Resig said:
                // If you're searching and replacing through a string with a static search and a static
                // replace it's faster to perform the action with .split("match").join("replace") -
                // which seems counter-intuitive but it manages to work that way in most modern browsers.
                // (There are changes going in place to grossly improve the performance of .replace(/match/g, "replace")
                // in the next version of Firefox - so the previous statement won't be the case for long.)
                (v.auto != null && v.auto.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1) ||
                (v.auto2 != null && v.auto2.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1)
            ) {
                return true;
            }
            return false;
        })
    }

    public openDetail(item) {
        this.nav.push(NeighborItemPage, {"item": item})
    }

    public showInvites() {
        this.nav.push(InvitesPage);
    }
}
