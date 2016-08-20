import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {EventsPage} from '../events/events.page';
import {ChatPage} from '../chat/chat.page';
import {NeighborsPage} from '../neighbors/neighbors.page';
import {GroupsPage} from '../groups/groups.page';

import {FirebaseService} from '../../services/firebase.service';
import {StartPage} from "../start/start.page";



@Component({
    templateUrl: 'build/pages/apptabs/apptabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab0Root:any = StartPage;
    tab1Root:any = EventsPage;
    tab2Root:any = ChatPage;
    tab3Root:any = NeighborsPage;

    tabIndex;

    constructor (params:NavParams){
        this.tabIndex = params.get("tabIndex");
    }

}
