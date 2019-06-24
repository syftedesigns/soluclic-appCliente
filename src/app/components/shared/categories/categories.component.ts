import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../../../services/db/product/product.service';
import { ObjectCategoriesClass } from 'src/app/classes/store/categories.class';
import { MenuService } from '../../../services/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  ArrayCategories: ObjectCategoriesClass[] = [];
  constructor(public modal: ModalController, private productDB: ProductService,
              private menu: MenuService, private router: Router) { }

  async ngOnInit() {
    const Categories = await this.Categories();
    if (Categories !== null) {
      this.ArrayCategories = Categories;
      console.log(Categories);
    } else {
      this.menu.ToastErrors('Error en el sistema');
      this.modal.dismiss(null);
      return;
    }
  }

  Categories(): Promise<ObjectCategoriesClass[]> {
    return new Promise((resolve, reject) => {
      this.productDB.StoreFind('GetCategoriesAPI').subscribe(
        (categoriesList) => {
          if (categoriesList.status) {
            resolve(categoriesList.data);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  // tslint:disable-next-line:variable-name
  Navigate(itemList: ObjectCategoriesClass, product_id: number): void {
    this.modal.dismiss();
    this.router.navigate([`/tabs/explorer/${itemList.category_id}/${product_id}`], {
      queryParams: {
        catname: itemList.name
      }
    });
  }
}
