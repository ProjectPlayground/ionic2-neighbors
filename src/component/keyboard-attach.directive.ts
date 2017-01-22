import {Directive, ElementRef, Input} from "@angular/core";
import {Content, Platform} from "ionic-angular";
import {Toast} from "ionic-native";
import {Subscription} from "rxjs/rx";


/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */

@Directive({
    selector: '[keyboardAttach]'
})
export class KeyboardAttachDirective {
    @Input('keyboardAttach') content: Content;

    private onShowSubscription: Subscription;
    private onHideSubscription: Subscription;

    constructor(private elementRef: ElementRef,
                private platform: Platform) {
        Toast.show('KeyboardAttachDirective cons','short','center');
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            Toast.show('KeyboardAttachDirective ios','short','center');
            window.addEventListener('native.keyboardshow', this.onShow);
            window.addEventListener('native.keyboardhide', this.onHide);
            //this.onShowSubscription = cordova.plugins.Keyboard.onKeyboardShow().subscribe(e => this.onShow(e));
            //this.onHideSubscription = cordova.plugins.Keyboard.onKeyboardHide().subscribe(() => this.onHide());
        }
    }

    ngOnDestroy() {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        if (this.onHideSubscription) {
            this.onHideSubscription.unsubscribe();
        }
    }

    private onShow(e) {
        Toast.show('KeyboardAttachDirective onShow','short','center');
        let keyboardHeight: number = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPosition(keyboardHeight);
    };

    private onHide() {
        Toast.show('KeyboardAttachDirective hide','short','center');
        this.setElementPosition(0);
    };

    private setElementPosition(pixels: number) {
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.resize();
    }
}