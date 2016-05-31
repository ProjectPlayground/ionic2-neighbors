import {IonicApp, Page, NavController} from 'ionic-angular';
import {TabsPage} from '../apptabs/apptabs';
import {SignupPage} from '../signup/signup.page';


@Page({
    templateUrl: 'build/pages/login/login.page.html'
})
export class LoginPage {
    static get parameters() {
        return [[NavController]];
    }

    constructor(nav) {
        this.nav = nav;
        this.login = {};
        this.submitted = false;
    }

    onLogin(form) {
        this.submitted = true;

        if (form.valid) {
            this.nav.push(TabsPage);
        }
    }

    onSignup() {
        this.nav.push(SignupPage);
    }
}
