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
    app:IonicApp;
    @Input()
    user:any;

    constructor(app:IonicApp) {
        this.app = app;
    }

    editProfile(user) {
        this.app.getActiveNav().push(ProfilePage);
    }
}
