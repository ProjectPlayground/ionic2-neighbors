import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {NeighborsService} from "../services/neighbors.service";
import {ChatService} from "../services/chat.service";
import {FirebaseService} from "../services/firebase.service";
import {UserService} from "../services/user.service";
import {EventsService} from "../services/events.service";
import {LogService} from "../services/log.service";
import {GroupsService} from "../services/groups.service";
import {PushService} from "../services/push.service";
import {UtilitiesService} from "../services/utilities.service";
import {TabsPage} from "../pages/apptabs/apptabs";
import {AddBoardPage} from "../pages/board/add_room/add_room.page";
import {BoardItemPage} from "../pages/board/item/board_item.page";
import {BoardPage} from "../pages/board/board.page";
import {PrivateItemPage} from "../pages/chat/private_item/private_item.page";
import {AddRoomPage} from "../pages/chat/room_item/add_room/add_room.page";
import {RoomItemPage} from "../pages/chat/room_item/room_item.page";
import {ChatPage} from "../pages/chat/chat.page";
import {EventsPage} from "../pages/events/events.page";
import {AddEventPage} from "../pages/events/add_event/add_event.page";
import {GroupsPage} from "../pages/groups/groups.page";
import {LoginPage} from "../pages/login/login.page";
import {InvitesPage} from "../pages/neighbors/invites/invites.page";
import {NeighborItemPage} from "../pages/neighbors/neighbor_item/neighbor_item.page";
import {NeighborsPage} from "../pages/neighbors/neighbors.page";
import {ProfilePage} from "../pages/profile/profile.page";
import {SignupPage} from "../pages/signup/signup.page";
import {StartPage} from "../pages/start/start.page";
import {UtilitiesPage} from "../pages/utilities/utilities.page";
import {AvatarComponent} from "../component/avatar.component";
import {LoadingModal} from "../component/loading.component";
import {KeyboardAttachDirective} from "../component/keyboard-attach.directive";

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        AddBoardPage,
        BoardItemPage,
        BoardPage,
        PrivateItemPage,
        AddRoomPage,
        RoomItemPage,
        ChatPage,
        AddEventPage,
        EventsPage,
        GroupsPage,
        LoginPage,
        InvitesPage,
        NeighborItemPage,
        NeighborsPage,
        ProfilePage,
        SignupPage,
        StartPage,
        UtilitiesPage,
        AvatarComponent,
        LoadingModal,
        KeyboardAttachDirective
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            tabsHideOnSubPages: true,
            platforms: {
                ios: {
                    statusbarPadding: true
                }
            }
        })
    ],
    exports: [
        KeyboardAttachDirective
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        AddBoardPage,
        BoardItemPage,
        BoardPage,
        PrivateItemPage,
        AddRoomPage,
        RoomItemPage,
        ChatPage,
        AddEventPage,
        EventsPage,
        GroupsPage,
        LoginPage,
        InvitesPage,
        NeighborItemPage,
        NeighborsPage,
        ProfilePage,
        SignupPage,
        StartPage,
        UtilitiesPage,
        AvatarComponent,
        LoadingModal
    ],
    providers: [NeighborsService, ChatService, FirebaseService, UserService, EventsService, LogService, GroupsService, PushService, UtilitiesService]
})
export class AppModule {
}
