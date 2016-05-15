import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

@Page({
    templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {
  
  static get parameters() {

    return [[NavController]];

  }

    constructor(nav){
        this.nav = nav;
    }
 
    goToHome(){
        this.nav.setRoot(TabsPage);

    }
}