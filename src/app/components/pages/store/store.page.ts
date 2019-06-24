import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExplorerComponent } from '../../shared/explorer/explorer.component';
import { ActivatedRoute } from '@angular/router';
import { ObjectProductClass } from 'src/app/classes/store/product.class';
import { ProductService } from '../../../services/db/product/product.service';
import { MenuService } from '../../../services/menu/menu.service';
import { SOLUCLIC_IMAGE_URL } from 'src/app/API/api_url.class';
import { ObjectManufacturerClass } from '../../../classes/store/manufacturer.class';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public StoreDetails: ObjectManufacturerClass = null;
  public ArrayProducts: ObjectProductClass[] = [];
  public StoreName: string = '';
  public URL_IMG: string = SOLUCLIC_IMAGE_URL;
  constructor(private modal: ModalController, private get: ActivatedRoute,
              private productDB: ProductService, private menu: MenuService) {
    this.get.params.subscribe(
        (param) => {
          this.StoreDetails = new ObjectManufacturerClass(param.manufacturer_id, param.store_name, '');
        }
    );
    this.get.queryParams.subscribe((extra) => {
      this.StoreDetails.image = extra.brand;
    });
  }

  async ngOnInit() {
    const StoreProducts = await this.FindAllProductStore();
    if (StoreProducts !== null) {
      this.ArrayProducts = StoreProducts;
    }
  }

  async OpenExplorerStore() {
    const modal = await this.modal.create({
      component: ExplorerComponent,
      cssClass: 'custom-modal',
      componentProps: this.StoreDetails
    });
    await modal.present();
    modal.onDidDismiss().then(async (data) => {
      if (data.data !== null) {
        // El usuario solicito una busqueda según categoria
        console.log(data.data);
        const productsByCategories = await this.GetProductByCategory(data.data.category_id);
        if (productsByCategories !== null) {
          this.ArrayProducts = productsByCategories; // Remplazamos por los nuevos productos
        } else {
          this.menu.ToastErrors('No hay productos de esta categoría');
          return;
        }
      } else {
        return;
      }
    }, () => {
      this.menu.ToastErrors('Error al procesar esta información');
      throw new Error('No pudo procesar ninguna información');
    });
  }
  // Función que nos devuelve todos los productos de la tienda
  FindAllProductStore(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this.productDB.StoreFind('selectManufacturersProductAPI-ID', this.StoreDetails.manufacturer_id)
        .subscribe((manufacturers) => {
          if (manufacturers.status) {
            resolve(manufacturers.data);
          } else {
            resolve(null);
            this.menu.ToastErrors('Esta tienda aun no tiene productos');
            return;
          }
        });
    });
  }
  GetProductByCategory(categoryID: number): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this.productDB.ProductsByStoreAndCategory('selectStoreProductsByCategory', this.StoreDetails.manufacturer_id, categoryID)
        .subscribe((prodByCatLIST) => {
          if (prodByCatLIST.status) {
            resolve(prodByCatLIST.data);
          } else {
            resolve(null);
          }
        });
    });
  }
}
