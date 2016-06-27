import {Component, Input} from '@angular/core';

@Component({
    selector: 'avatar',
    template: `
        <ion-item>
            <ion-avatar item-left>
                <img src="{{user?.photoURL}}">
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
