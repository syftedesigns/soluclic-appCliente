import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuService } from './services/menu/menu.service';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuService,
    private router: Router
  ) {
    this.initializeApp();
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(  target => target instanceof ActivationEnd ),
      filter(  (target: ActivationEnd) => target.snapshot.firstChild === null),
      map( (target: ActivationEnd) => {
        return target.snapshot.data;
      })
    ).subscribe(
      (resp: any) => {
        // Seteamos el menu
        this.menu.displayCategories = resp.showCategoriesMenu;
        if (resp.HideMenu) {
          this.menu.displayToolbar = false;
        } else {
          this.menu.displayToolbar = true;
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
