import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { ProductService } from '../../../services/db/product/product.service';
import { ObjectProductClass } from '../../../classes/store/product.class';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public Explorer: string = '';
  public ProductFindIndex: ObjectProductClass[] = [];
  constructor(public menu: MenuService, private productDB: ProductService) { }

  ngOnInit() {

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
}
