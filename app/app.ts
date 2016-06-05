import {ViewChild} from '@angular/core';
import {App, Events, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {NeighborsService} from './services/neighbors.service';
import {ChatService} from './services/chat.service';

import {TabsPage} from './pages/apptabs/apptabs';
import {LoginPage} from './pages/login/login.page';
import {SignupPage} from './pages/signup/signup.page';
import {NeighborsPage} from './pages/neighbors/neighbors.page';

@App({
    templateUrl: 'build/app.html',
    config: {
        //Whether to hide the tabs on child pages or not. If true it will not show the tabs on child pages.
        tabSubPages: true
    }, // http://ionicframework.com/docs/v2/api/config/Config/
    queries: {
        nav: new ViewChild('content')
    },
    providers: [NeighborsService, ChatService]
})
export class MyApp {
    rootPage:any = TabsPage;
    menu;
    loggedInPages;
    loggedOutPages;
    nav;

    constructor(events:Events, platform:Platform, menu:MenuController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
//        platform.fullScreen();

        this.menu = menu;

        this.loggedInPages = [
            {title: 'Login', component: LoginPage, icon: 'log-out'}
        ];

        this.loggedOutPages = [
            {title: 'Соседи', component: TabsPage, icon: 'md-people', index: 3},
            {title: 'Парковка', component: LoginPage, icon: 'car'},
            {title: 'Двор', component: LoginPage, icon: 'map'},
            {title: 'Дети', component: LoginPage, icon: 'ios-people'},
            {title: 'Коммунальные услуги', component: LoginPage, icon: 'calculator'},
            {title: 'Доска объявлений', component: LoginPage, icon: 'calendar'},
            {title: 'Не забыть', component: LoginPage, icon: 'information-circle'},
            {title: 'Logout', component: SignupPage, icon: 'log-out'}
        ];

        this.enableMenu('true');
    }

    enableMenu(loggedIn) {
        this.menu.enable(loggedIn, "loggedInMenu");
        this.menu.enable(!loggedIn, "loggedOutMenu");
    }

    openPage(page) {
        // find the nav component and set what the root page should be
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});
        } else {
            this.nav.setRoot(page.component);
        }

        if (page.title === 'Logout') {
            // Give the menu time to close before changing to logged out
            setTimeout(() => {
                //this.userData.logout();
            }, 1000);
        }
    }
}
