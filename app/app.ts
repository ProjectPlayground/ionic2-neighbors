import {ViewChild} from '@angular/core';
import {App, Events, Platform, MenuController, Loading} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {NeighborsService} from './services/neighbors.service';
import {ChatService} from './services/chat.service';
import {FirebaseService} from './services/firebase.service';
import {UserService} from './services/user.service';
import {EventsService} from "./services/events.service";
import {LogService} from "./services/log.service";

import {TabsPage} from './pages/apptabs/apptabs';
import {LoginPage} from './pages/login/login.page';
import {AvatarComponent} from "./component/avatar.component";
import {GroupsService} from "./services/groups.service";
import {GroupsPage} from "./pages/groups/groups.page";
import {ProfilePage} from "./pages/profile/profile.page";
import {IUser} from "./model/user";

@App({
    templateUrl: 'build/app.html',
    config: {
        //Whether to hide the tabs on child pages or not. If true it will not show the tabs on child pages.
        tabSubPages: true
    }, // http://ionicframework.com/docs/v2/api/config/Config/
    queries: {
        nav: new ViewChild('content')
    },
    directives: [AvatarComponent],
    providers: [NeighborsService, ChatService, FirebaseService, UserService, EventsService, LogService, GroupsService]
})
export class MyApp {
    rootPage:any = LoginPage;
    menu:MenuController;
    events:Events;
    loggedInPages;
    loggedOutPages;
    nav;
    db:FirebaseService;
    userService:UserService;
    currentUser:IUser;
    loading:Loading;

    constructor(events:Events, platform:Platform, menu:MenuController, db:FirebaseService, us:UserService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            if (this.db.isLogged()) {
                this.rootPage = TabsPage;
                this.enableMenu(true);
            } else {
                this.rootPage = LoginPage;
                this.enableMenu(false);
            }
        });
        this.events = events;
        this.db = db;
        this.userService = us;
        this.menu = menu;
        this.loading = null;
        this.loggedOutPages = [
            {title: 'Login', component: LoginPage, icon: 'log-in'}
        ];
        this.loggedInPages = [
            {title: 'Соседи', component: TabsPage, icon: 'md-people', index: 3},
            {title: 'Парковка', component: LoginPage, icon: 'car'},
            {title: 'Двор', component: LoginPage, icon: 'map'},
            {title: 'Дети', component: LoginPage, icon: 'ios-people'},
            {title: 'Коммунальные услуги', component: LoginPage, icon: 'calculator'},
            {title: 'Доска объявлений', component: LoginPage, icon: 'calendar'},
            {title: 'Не забыть', component: LoginPage, icon: 'information-circle'},
            {title: 'Выход', icon: 'log-out', action: 'logout'}
        ];
        this.listenToLoginEvents();
    }

    private enableMenu(loggedIn) {
        this.menu.enable(loggedIn, "loggedInMenu");
        this.menu.enable(!loggedIn, "loggedOutMenu");
    }

    openPage(page) {
        if (page.action === 'logout') {
            // Give the menu time to close before changing to logged out
            console.log("logout press in menu");
            this.db.logout();
        }
        // find the nav component and set what the root page should be
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});
        } else {
            this.nav.setRoot(page.component);
        }
    }

    private showLoading(content) {
        if (this.loading == null) {
            this.loading = Loading.create({
                content: content
            });

            this.nav.present(this.loading);
        } else {
            this.loading.setContent(content);
        }
    }

    private hideLoading() {
        if (this.loading != null) {
            this.loading.dismiss();
            this.loading = null;
        }
    }

    private listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
            this.showLoading("Загрузка данных о пользователе");
            this.userService.loadUserData();
        });

        this.events.subscribe('user:loaded', () => {
            LogService.logMessage(" listenToLoginEvents user:loaded");
            this.currentUser = UserService.getCurrentUser();
            if (this.currentUser.memberOf == null || typeof this.currentUser.memberOf === 'undefined') {
                LogService.logMessage("this.currentUser.memberOf is undefined");
                this.rootPage = GroupsPage;
            } else {
                //if user in group - show interface
                this.enableMenu(true);
                this.rootPage = TabsPage;
                this.hideLoading();
            }
        });

        this.events.subscribe('user:new', () => {
            console.log(" listenToLoginEvents user:new");
            this.enableMenu(true);
            this.rootPage = ProfilePage;
        });


        this.events.subscribe('user:logout', () => {
            console.log(" listenToLoginEvents user:logout");
            this.enableMenu(false);
            this.rootPage = LoginPage;
            UserService.user = null;
        });

        this.events.subscribe('loader:start', (content) => {
            this.showLoading(content);
        });

        this.events.subscribe('loader:stop', () => {
            this.hideLoading();
        });
    }
}