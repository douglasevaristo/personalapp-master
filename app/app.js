import 'es6-shim';
import {App, Platform,MenuController,SqlStorage,Storage,LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {AddAulaPage} from './pages/add-aula/add-aula';
import {Facebook} from 'ionic-native';
import {Grupo} from './providers/grupo/grupo';
import {Mask} from './components/mask/mask';
import {IntroPage} from './pages/intro/intro';
import PouchDB from '../node_modules/pouchdb/dist/pouchdb';


@App({
  templateUrl: 'build/pages/app.html',
  config: {tabbarPlacement: 'bottom'},
  diretives:[Mask],
  providers : [Grupo]
})
export class MyApp {
  static get parameters() {
    return [[Platform,MenuController]];
  }

  constructor(platform,menu) {
    this.rootPage = TabsPage;
    this.menu = menu;
    this.local = new Storage(LocalStorage);

    this.local.get('novousuario').then((result) => {
        if(result){
            this.rootPage = TabsPage;
        } else {
            this.local.set('novousuario', true);
            this.rootPage = IntroPage;
        }

    });

    if(window.cordova){
      let app = {
        initialize: function() {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        },
        onDeviceReady: function() {
            document.addEventListener('resume', app.onResume, false);
            document.addEventListener('pause', app.onPause, false);
            Apptentive.deviceReady(app.successLogger, app.errorAlert);
        },
        onResume: function() {
            Apptentive.resume(app.successLogger, app.errorAlert);
        },
        onPause: function() {
            Apptentive.pause(app.successLogger, app.errorAlert);
        }
      };
      app.initialize();
    }

  }
}
