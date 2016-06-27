import {Page} from 'ionic-angular';
import {EventsService} from "../../services/events.service";
import {LogService} from "../../services/log.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs/Observable";


@Page({
    templateUrl: 'build/pages/events/events.page.html',
})
export class EventsPage {
    private items:Observable<any>;

    constructor(es:EventsService) {
        this.items = es.getEventsWithout();
    }
}
