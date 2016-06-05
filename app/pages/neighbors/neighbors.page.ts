import {Page, NavController} from 'ionic-angular';
import {NeighborItemPage} from '../neighbors/neighbor_item/neighbor_item.page';
import {NeighborsService} from '../../services/neighbors.service';

@Page({
    templateUrl: 'build/pages/neighbors/neighbors.page.html',
})
export class NeighborsPage {
    data;
    sourceNeighbors;
    neighbors;
    searchQuery;
    nav;

    constructor(data: NeighborsService, nav: NavController) {
        this.searchQuery = '';
        this.nav = nav;
        this.data = data;
        this.neighbors = this.sourceNeighbors = this.data.getAllNeighbors();
    }

    getItems(event) {
        let q = event.value;
        this.neighbors = this.sourceNeighbors.filter((v) => {
            if (
                (v.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1) ||
                (v.lastName.toLowerCase().indexOf(q.toLowerCase()) > -1) ||
                (v.flatNumber.toLowerCase().indexOf(q.toLowerCase()) > -1) ||
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

    openDetail(id) {
        this.nav.push(NeighborItemPage, {"id": id})
    }
}
