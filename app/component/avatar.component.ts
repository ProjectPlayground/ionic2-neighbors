import {Component, Input} from '@angular/core';
import {NavController, IonicApp} from "ionic-angular/index";
import {ProfilePage} from "../pages/profile/profile.page";

@Component({
    selector: 'avatar',
    template: `
        <ion-item menuClose (click)="editProfile(user)">
            <ion-avatar item-left>
                <img [src]="(user!=null && user.photoURL!=null) ? user.photoURL : 'build/img/avatar.png'" >
            </ion-avatar>
            <h2>{{user?.displayName}} </h2>
        </ion-item> 
`
})
//@Injectable()
export class AvatarComponent {
    @Input()
    user:any;

    constructor(public app:IonicApp) {
    }

    editProfile(user) {
        this.app.getActiveNav().push(ProfilePage);
    }
}
