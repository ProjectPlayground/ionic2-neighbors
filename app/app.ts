import {ViewChild, Component} from "@angular/core";
import {
    ionicBootstrap,
    Nav,
    Events,
    Platform,
    MenuController,
    LoadingController,
    Loading,
    ToastController
} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {NeighborsService} from "./services/neighbors.service";
import {ChatService} from "./services/chat.service";
import {FirebaseService} from "./services/firebase.service";
import {UserService} from "./services/user.service";
import {EventsService} from "./services/events.service";
import {LogService} from "./services/log.service";
import {TabsPage} from "./pages/apptabs/apptabs";
import {LoginPage} from "./pages/login/login.page";
import {AvatarComponent} from "./component/avatar.component";
import {GroupsService} from "./services/groups.service";
import {GroupsPage} from "./pages/groups/groups.page";
import {ProfilePage} from "./pages/profile/profile.page";
import {IUser} from "./model/user";
import {BasePage} from "./pages/base.page";
import {PushService} from "./services/push.service";
import {LoadingModal} from "./component/loading.component";
import {UtilitiesPage} from "./pages/utilities/utilities.page";
import {UtilitiesService} from "./services/utilities.service";
import {BoardPage} from "./pages/board/board.page";


@Component({
    templateUrl: 'build/app.html',
    directives: [AvatarComponent, LoadingModal]
})
export class MyApp extends BasePage {
    @ViewChild(Nav) nav:Nav;
    @ViewChild(LoadingModal) loadingModal:LoadingModal;
    rootPage:any = LoginPage;
    loggedInPages;
    loggedOutPages;
    currentUser:IUser;
    tabs:TabsPage;
    static token;

    constructor(public events:Events, platform:Platform, public menu:MenuController, public db:FirebaseService, public userService:UserService,
                private toastCtrl:ToastController, private push:PushService) {
        super(toastCtrl);
        this.tabs = TabsPage;
        platform.ready().then(() => {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.disableScroll(true);
                window.cordova.plugins.Keyboard.shrinkView(true);
                window.cordova.plugins.Keyboard.disableScrollingInShrinkView(true);

            }
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
            //cordova.plugins.Keyboard.disableScroll(true);
            window.addEventListener('keyboardDidShow', MyApp.onShowKeyboard);
            window.addEventListener('keyboardDidHide', MyApp.onHideKeyboard);

        });
        this.loggedOutPages = [
            {title: 'Login', component: LoginPage, icon: 'log-in'}
        ];
        this.loggedInPages = [
            {title: 'Соседи', component: TabsPage, icon: 'md-people', index: 3},
            //{title: 'Парковка', component: LoginPage, icon: 'car'},
            //{title: 'Двор', component: LoginPage, icon: 'map'},
            //{title: 'Дети', component: LoginPage, icon: 'ios-people'},
            {title: 'Коммунальные услуги', component: UtilitiesPage, icon: 'calculator'},
            {title: 'Доска объявлений', component: BoardPage, icon: 'calendar', index: 1},
            //{title: 'Не забыть', component: LoginPage, icon: 'information-circle'},
            {title: 'Выход', icon: 'log-out', action: 'logout'}
        ];
        this.listenToLoginEvents();


    }

    static onShowKeyboard(e) {
        var event = new CustomEvent('keyboardShown');
        event['keyboardHeight'] = e.keyboardHeight;
        document.dispatchEvent(event);
    }

    static onHideKeyboard() {
        var event = new CustomEvent('keyboardShown');
        event['closed'] = true;
        document.dispatchEvent(event);
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
        LogService.logMessage("openPage", page);
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});
        } else {
            this.nav.setRoot(page.component);
        }
    }

    private showCustomLoading(content) {
        this.loadingModal.show(content);
    }

    private hideCustomLoading() {
        this.loadingModal.hide();
    }


    private listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
            this.showCustomLoading("Загрузка данных о пользователе");
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
                this.hideCustomLoading();
            }
        });

        this.events.subscribe('user:new', () => {
            LogService.logMessage(" listenToLoginEvents user:new");
            this.enableMenu(true);
            this.rootPage = ProfilePage;
        });


        this.events.subscribe('user:logout', () => {
            LogService.logMessage(" listenToLoginEvents user:logout");
            this.enableMenu(false);
            this.rootPage = LoginPage;
            UserService.user = null;
        });

        this.events.subscribe('loader:start', (content) => {
            this.showCustomLoading(content);
        });

        this.events.subscribe('loader:stop', () => {
            this.hideCustomLoading();
        });

        this.events.subscribe('toast:show', (text) => {
            this.presentToast(text);
        });
    }
}

// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(MyApp, [NeighborsService, ChatService, FirebaseService, UserService, EventsService, LogService, GroupsService, PushService, UtilitiesService],
    {
        //Whether to hide the tabs on child pages or not. If true it will not show the tabs on child pages.
        tabsHideOnSubPages: true,
        platforms: {
            ios: {
                statusbarPadding: true
            }
        }
    });
