import {Page, NavController} from 'ionic-angular';
import {NeighborItemPage} from '../neighbors/neighbor_item/neighbor_item.page';
import {NeighborsService} from '../../services/neighbors.service';
import {IUser} from "../../model/user";

@Page({
    templateUrl: 'build/pages/neighbors/neighbors.page.html',
})
export class NeighborsPage {
    data:NeighborsService;
    sourceNeighbors:IUser[];
    neighbors:IUser[];
    searchQuery:string;
    nav:NavController;

    constructor(data:NeighborsService, nav:NavController) {
        this.searchQuery = '';
        this.nav = nav;
        this.data = data;
        data.getMembersOfCurrentGroup().subscribe(data=> {
            this.sourceNeighbors = this.neighbors = data;
            //render if filter is active
            this.getItems();
        });

    }

    getItems() {
        let q = this.searchQuery;
        this.neighbors = this.sourceNeighbors.filter((v) => {
            if (
                (v.displayName.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1) ||
                // John Resig said:
                // If you're searching and replacing through a string with a static search and a static
                // replace it's faster to perform the action with .split("match").join("replace") -
                // which seems counter-intuitive but it manages to work that way in most modern browsers.
                // (There are changes going in place to grossly improve the performance of .replace(/match/g, "replace")
                // in the next version of Firefox - so the previous statement won't be the case for long.)
                (v.auto.split(' ').join('').toLowerCase().indexOf(q.split(' ').join('').toLowerCase()) > -1)
            ) {
                return true;
            }
            return false;
        })
    }

    openDetail(item) {
        this.nav.push(NeighborItemPage, {"item": item})
    }
}
