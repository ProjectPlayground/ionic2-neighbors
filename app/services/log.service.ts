import {Injectable} from "@angular/core";
import {Events} from 'ionic-angular';
import {FirebaseService} from './firebase.service'

@Injectable()
export class LogService {

    public static logMessage(str, obj?) {
        var buff = str;
        if (typeof obj !== "undefined") {
            buff = buff + LogService.simpleStringify(obj);
        }
        console.log(buff)
    }

    private static simpleStringify(object) {
        var simpleObject = {};
        for (var prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            if (typeof(object[prop]) == 'object') {
                continue;
            }
            if (typeof(object[prop]) == 'function') {
                continue;
            }
            simpleObject[prop] = object[prop];
        }
        return JSON.stringify(simpleObject); // returns cleaned up JSON
    };

}
