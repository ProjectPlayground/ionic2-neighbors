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
    private us:IUser;

    constructor( es:EventsService, public nav:NavController) {
        this.items = es.getEvents();
        this.us = UserService.getCurrentUser();
    }

    public createEvent() {
        let modal = Modal.create(AddEventPage, {charNum: 1});
        this.nav.present(modal);
    }
}
