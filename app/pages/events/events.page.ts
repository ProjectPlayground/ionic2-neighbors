import {ModalController, Page, Platform, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';

import {EventsService} from '../../services/events.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';

import {IUser} from '../../model/user';

import {AddEventPage} from './add_event/add_event.page'


@Component({
    templateUrl: 'build/pages/events/events.page.html',
})
export class EventsPage {
    private items:Observable<any>;
    private us:IUser;

    constructor( es:EventsService, public nav:NavController, private modalCtrl:ModalController) {
        this.items = es.getEvents();
        this.us = UserService.getCurrentUser();
    }

    public createEvent() {
        let modal = this.modalCtrl.create(AddEventPage, {charNum: 1});
        modal.present();
    }
}
