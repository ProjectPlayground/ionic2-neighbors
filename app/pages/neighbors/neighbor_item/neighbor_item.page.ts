import {Page, NavParams} from 'ionic-angular';
import {NeighborsService} from '../../../services/neighbors.service';

@Page({
    templateUrl: 'build/pages/neighbors/neighbor_item/neighbor_item.page.html',
})
export class NeighborItemPage {
    neighbor;

    constructor(data:NeighborsService, navParams:NavParams) {
        this.neighbor = navParams.get("item");
    }

}
