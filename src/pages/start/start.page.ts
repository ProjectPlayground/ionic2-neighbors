import {Component} from '@angular/core';
import {PushService} from "../../services/push.service";
import {LogService} from "../../services/log.service";

@Component({
    templateUrl: 'start.page.html',
})
export class StartPage {

    constructor(private push:PushService) {
    }

    private test():void {
        LogService.logMessage("TEST_BUTTON click");
        this.push.registerDevice("token", "user_id", "group_id");
    }

}
