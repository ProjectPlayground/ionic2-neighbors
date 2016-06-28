import {Modal, Page, Platform, NavController, NavParams, ViewController} from 'ionic-angular';
import {EventsService} from '../../services/events.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';

import {IUser} from '../../model/user';

import {AddEventPage} from './add_event/add_event.page'


@Page({
    templateUrl: 'build/pages/events/events.page.html',
})
export class EventsPage {
    private items:Observable<any>;
    private nav:NavController;
    private us:IUser;

    constructor(es:EventsService, nav:NavController) {
        this.items = es.getEvents();
        this.nav = nav;
        this.us = UserService.user;
    }

    public createEvent() {
        let modal = Modal.create(AddEventPage, {charNum: 1});
        this.nav.present(modal);
    }
}
