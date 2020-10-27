import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { ProductService } from '../../../services/db/product/product.service';
import { ObjectProductClass } from '../../../classes/store/product.class';
import { DirService } from '../../../services/auth/dir.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public Explorer: string = '';
  public ProductFindIndex: ObjectProductClass[] = [];
  platform: string = '';
  constructor(public menu: MenuService, public productDB: ProductService,
              public dir: DirService, private auth: AuthService,
              public parent: Platform) {
                if (this.parent.is('android')) {
                  this.platform = 'android';
                } else {
                  if (this.parent.is('ios')) {
                    this.platform = 'ios';
                  }
                }
              }

  ngOnInit() {
    // Verificamos los productos en el carrito
    this.GetCartsQty().then(
      (qty) => {
        if (qty !== null) {
          // Tiene productos, por lo que lo seteamos el contador en el servicio
          this.productDB.QtyItems = qty;
        }
      }
    );
  }

  async ExplorerProducts(keyword: any) {
      if (keyword.detail.value !== null) {
        const products = await this.FinProductBySearch(keyword.detail.value);
        if (products !== null) {
          this.ProductFindIndex = products;
          this.menu.isSearching = true;
          console.log(this.ProductFindIndex);
        } else {
          this.ProductFindIndex = [];
          this.menu.isSearching = false;
          return;
        }
      }
  }
  FinProductBySearch(keyword: string): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      if (keyword) {
        this.productDB.GetProductsBySearch(keyword, 'explorerNewAPI')
          .subscribe((products) => {
            if (products.status) {
              resolve(products.data);
            } else {
              resolve(null);
              return;
            }
          });
      }
    });
  }
  ClearSearch(keybutton): void {
    if (keybutton === 'Backspace') {
      if (this.Explorer.length <= 1) {
        this.ProductFindIndex = [];
        this.menu.isSearching = false;
      }
    }
  }
  GetCartsQty(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.dir.GetAnyThingByPrefix('products.php', 'countCarts', this.auth._id.toString(), 'customer_id')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.total);
          } else {
            resolve(null);
          }
        });
    });
  }
}
