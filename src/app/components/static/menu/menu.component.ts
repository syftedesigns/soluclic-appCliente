import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { MenuService } from '../../../services/menu/menu.service';
import { StoresComponent } from '../../shared/stores/stores.component';
import { CategoriesComponent } from '../../shared/categories/categories.component';
import { OrdersComponent } from '../../shared/orders/orders.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController, private menuService: MenuService,
              public modal: ModalController) { }

  ngOnInit() {}
  openMenu(): void {
  }

  async OpenStores() {
    this.menu.close();
    const modal = await this.modal.create({
      component: StoresComponent,
      cssClass: 'modal-stores'
    });
    await modal.present();
  }
  async OpenCategories() {
    this.menu.close();
    const modal = await this.modal.create({
      component: CategoriesComponent,
      cssClass: 'modal-stores'
    });
    await modal.present();
  }
  async OpenOrders() {
    this.menu.close();
    const modal = await this.modal.create({
      component: OrdersComponent,
      cssClass: 'modal-stores'
    });
    await modal.present();
  }
}
