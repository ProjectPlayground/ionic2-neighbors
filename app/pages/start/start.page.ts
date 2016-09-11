import {Component, ViewChild} from '@angular/core';
import {TabsPage} from "../apptabs/apptabs";
import {PushService} from "../../services/push.service";
import {LogService} from "../../services/log.service";

@Component({
    templateUrl: 'build/pages/start/start.page.html',
})
export class StartPage {

    constructor(private push:PushService) {
    }

    public test():void {
        LogService.logMessage("TEST_BUTTON click");
        this.push.registerDevice("token", "user_id", "group_id");
    }

}
