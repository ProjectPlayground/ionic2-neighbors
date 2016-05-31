import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../apptabs/apptabs';


@Page({
    templateUrl: 'build/pages/signup/signup.page.html'
})
export class SignupPage {
    static get parameters() {
        return [[NavController], [UserData]];
    }

    constructor(nav, userData) {
        this.nav = nav;
        this.userData = userData;

        this.signup = {};
        this.submitted = false;
    }

    onSignup(form) {
        this.submitted = true;

        console.log(form);

        if (form.valid) {
            this.userData.signup();
            this.nav.push(TabsPage);
        }
    }
}
