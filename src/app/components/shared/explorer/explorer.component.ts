import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ObjectManufacturerClass } from '../../../classes/store/manufacturer.class';
import { ProductService } from '../../../services/db/product/product.service';
import { MenuService } from '../../../services/menu/menu.service';
import { ObjectCategoriesClass } from '../../../classes/store/categories.class';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
   public StoreDetais: ObjectManufacturerClass = null;
   public CategoriesStore: ObjectCategoriesClass[] = [];
  constructor(public modal: ModalController, public navParam: NavParams,
              private productDB: ProductService, private menu: MenuService) {
    this.StoreDetais = new ObjectManufacturerClass(this.navParam.data.manufacturer_id,
        this.navParam.data.name,
        this.navParam.data.image);
  }

  async ngOnInit() {
    const ArrayCategories = await this.StoreProductsByCategories();
    if (ArrayCategories !== null) {
      this.CategoriesStore = ArrayCategories;
    } else {
      this.modal.dismiss(null, 'cancel');
      return;
    }
  }

  // Función que trae todas las categorías que maneja el producto
  StoreProductsByCategories(): Promise<ObjectCategoriesClass[]> {
    return new Promise((resolve, reject) => {
      const Arraylist: ObjectCategoriesClass[] = new Array(); // Aqui es donde iremos insertando cada categoria que maneja los productos
      this.productDB.StoreFind('StoreCategories', this.StoreDetais.manufacturer_id)
        .subscribe((categoriesList) => {
          if (categoriesList.status) {
            // Por cada interacción de productos que traere, sacaremos la información de la categoria
            for (const categoryData of categoriesList.data) {
              Arraylist.push(new ObjectCategoriesClass(categoryData.category_id, categoryData.language_id, categoryData.name,
                categoryData.description, categoryData.meta_title, categoryData.meta_description, categoryData.meta_keyword));
            }
            resolve(Arraylist);
          } else {
            resolve(null);
            this.menu.ToastErrors('Esta tienda aun no maneja categorías');
            return;
          }
        });
    });
  }
}
