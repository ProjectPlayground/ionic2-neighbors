import {Component} from '@angular/core';
import {LogService} from "../../services/log.service";
import {UtilitiesService} from "../../services/utilities.service";

@Component({
    selector: 'utilities-page',
    templateUrl: 'utilities.page.html'
})
export class UtilitiesPage {
    private content: string = 'Коммунальные услуги';

    constructor(private us: UtilitiesService) {
        LogService.logMessage("UtilitiesPage constructor");
        us.getUtilities((str)=> {
            LogService.logMessage("UtilitiesPage getUtilities " + str);
            this.content = str;
        })
    }

}
