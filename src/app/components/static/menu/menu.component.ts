import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { MenuService } from '../../../services/menu/menu.service';
import { StoresComponent } from '../../shared/stores/stores.component';
import { CategoriesComponent } from '../../shared/categories/categories.component';
import { OrdersComponent } from '../../shared/orders/orders.component';
import { Router } from '@angular/router';
import { NotifyComponent } from '../../shared/config/notify/notify.component';
import { AccountComponent } from '../../shared/config/account/account.component';
import { OffersComponent } from '../../shared/explorer/offers/offers.component';
import { HelpComponent } from '../../shared/config/help/help.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public menu: MenuController, private menuService: MenuService,
              public modal: ModalController, private route: Router,
              public auth: AuthService) { }

  ngOnInit() {}
  // Que se encarga de crear modales según el link
  async OpenMenu(linkForOpen: string) {
    let modal;
    switch (linkForOpen) {
      case 'categories':
          this.menu.close();
          modal = await this.modal.create({
            component: CategoriesComponent,
            cssClass: 'modal-stores'
          });
          await modal.present();
          break;
        case 'stores':
            this.menu.close();
            modal = await this.modal.create({
              component: StoresComponent,
              cssClass: 'modal-stores'
            });
            await modal.present();
            break;
        case 'orders':
            this.menu.close();
            modal = await this.modal.create({
              component: OrdersComponent,
              cssClass: 'modal-stores'
            });
            await modal.present();
            break;
         case 'notify':
            this.menu.close();
            modal = await this.modal.create({
              component: NotifyComponent,
              cssClass: 'modal-stores'
            });
            await modal.present();
            break;
          case 'account':
            this.menu.close();
            modal = await this.modal.create({
              component: AccountComponent,
              cssClass: 'modal-stores'
            });
            await modal.present();
            break;
          case 'offers':
              this.menu.close();
              modal = await this.modal.create({
                component: OffersComponent,
                cssClass: 'modal-stores'
              });
              await modal.present();
              break;
          case 'help':
                  this.menu.close();
                  modal = await this.modal.create({
                    component: HelpComponent,
                    cssClass: 'modal-stores'
                  });
                  await modal.present();
                  break;

    }
  }
  // Router Pages
  NavigateToPage(urlToNavigate: string): void {
    this.modal.dismiss();
    this.menu.toggle('first'); // Cierra el menu para hacer la navegación
    this.route.navigate([`/${urlToNavigate}`]);
  }
  logout() {
    this.auth.Logout();
    setTimeout(() => {
      this.menu.close();
    }, 500);
  }
}
