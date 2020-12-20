import { Component, OnInit } from "@angular/core";
import { Router, RoutesRecognized, ActivatedRoute } from "@angular/router";

import { Platform, MenuController} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FirebaseService } from "./services/firebase.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  routeSubscription;
  disableMenu;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private route: ActivatedRoute,
    public menuController:MenuController,
    public firebaseService: FirebaseService,
  ) {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild.routeConfig.path;
        if(route != 'login'){
          this.disableMenu = false;
        }else{
          this.disableMenu = true;
        }
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
