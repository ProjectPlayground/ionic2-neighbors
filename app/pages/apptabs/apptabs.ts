import {Page} from 'ionic-angular';
import {Page1} from '../events/events.page';
import {ChatPage} from '../chat/chat.page';
import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/apptabs/apptabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Page1;
  tab2Root: any = ChatPage;
  tab3Root: any = Page3;
}
