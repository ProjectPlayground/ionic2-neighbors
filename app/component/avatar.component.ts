import {Component, Input} from '@angular/core';

@Component({
    selector: 'avatar',
    template: `
        <ion-item>
            <ion-avatar *ngIf="user!=null && user.photoURL!=null" item-left>
                <img src="{{user?.photoURL}}">
            </ion-avatar>
            <ion-avatar *ngIf="user!=null && user.photoURL==null" item-left>
                <img src="build/img/avatar.png">
            </ion-avatar>
            <h2>{{user?.displayName}}</h2>
            <p>November 5, 1955</p>
        </ion-item>
`
})
export class AvatarComponent {
    @Input()
    user:any;
}
