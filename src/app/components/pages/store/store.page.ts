import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExplorerComponent } from '../../shared/explorer/explorer.component';
import { ActivatedRoute } from '@angular/router';
import { ObjectProductClass } from 'src/app/classes/store/product.class';
import { ProductService } from '../../../services/db/product/product.service';
import { MenuService } from '../../../services/menu/menu.service';
import { SOLUCLIC_IMAGE_URL } from 'src/app/API/api_url.class';
import { ObjectManufacturerClass } from '../../../classes/store/manufacturer.class';
import { NgForm } from '@angular/forms';
import { ObjectSavedProductClass } from 'src/app/classes/store/productSaved.class';
import { AuthService } from '../../../services/auth/auth.service';
import * as $ from 'jquery';

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
  public isLoading: boolean = false;
  constructor(private modal: ModalController, private get: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _product: ProductService, private _menu: MenuService,
              public auth: AuthService) {
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
    this.isLoading = true;
    const StoreProducts = await this.FindAllProductStore();
    if (StoreProducts !== null) {
      this.ArrayProducts = StoreProducts;
      this.isLoading = false;
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
          this._menu.ToastErrors('No hay productos de esta categoría');
          return;
        }
      } else {
        return;
      }
    }, () => {
      this._menu.ToastErrors('Error al procesar esta información');
      throw new Error('No pudo procesar ninguna información');
    });
  }
  // Función que nos devuelve todos los productos de la tienda
  FindAllProductStore(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this._product.StoreFind('selectManufacturersProductAPI-ID', this.StoreDetails.manufacturer_id)
        .subscribe((manufacturers) => {
          if (manufacturers.status) {
            resolve(manufacturers.data);
          } else {
            resolve(null);
            this._menu.ToastErrors('Esta tienda aun no tiene productos');
            return;
          }
        });
    });
  }
  GetProductByCategory(categoryID: number): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this._product.ProductsByStoreAndCategory('selectStoreProductsByCategory', this.StoreDetails.manufacturer_id, categoryID)
        .subscribe((prodByCatLIST) => {
          if (prodByCatLIST.status) {
            resolve(prodByCatLIST.data);
          } else {
            resolve(null);
          }
        });
    });
  }
  SaveCartProduct(cartItem: NgForm): void {
    if (cartItem.invalid) {
      throw new Error('Failure');
    }
    const prefix = cartItem.value;
    // Verificamos el tipo de operación
    switch (prefix.operation) {
      case 'wishlist':
        // Agregamos a favoritos
        this._menu.OpenLoader('Guardando en favoritos...');
        const WishList = new ObjectSavedProductClass(prefix.customer_id, null, prefix.product_id,
          null, null, null, null, null, null);
        this._product.SaveProduct('addWishItem', WishList)
          .subscribe(async (favorite) => {
            if (favorite.status) {
              // Si guardo en la lista de favoritos, hacemos un push en el servicio
              const favoriteProductInfo = await this.GetProductInfo(favorite.object.product_id);
              if (favoriteProductInfo !== null) {
               // Tenemos los datos del producto entonces hacermos el push
               this._product.Favorites.unshift(favoriteProductInfo);
               setTimeout(() => {
                 this._menu.closeLoader();
                 this._menu.ToastErrors('Artículo guardado como favorito');
               }, 800);
              }
            } else {
              setTimeout(() => {
                this._menu.closeLoader();
                this._menu.ToastErrors('Este artículo ya esta en tu lista');
              }, 800);
            }
          });
        break;
        // carrito
        case 'cart':
        this._menu.OpenLoader('Agrengado artículo al carrito...');
        const CartItem = new ObjectSavedProductClass(prefix.customer_id, prefix.session, prefix.product_id,
          prefix.recurring_id, prefix.option, prefix.quantity, null, prefix.api_id);
        this._product.SaveProduct('addItem', CartItem)
            .subscribe(async (cart) => {
              if (cart.status) {
                // Si guardo en la lista de favoritos, hacemos un push en el servicio
                const cartProductInfo = await this.GetProductInfo(cart.object.product_id);
                if (cartProductInfo !== null) {
                  this.auth.SavedCartItems.unshift(cartProductInfo);
                  // Sumamos 1 al contador de items del carrito
                  this._product.QtyItems++;
               // Tenemos los datos del producto entonces hacermos el push
                  setTimeout(() => {
                      this._menu.closeLoader();
                      this._menu.ToastErrors('Artículo guardado al carrito');
                    }, 800);
              }
              } else {
                setTimeout(() => {
                  this._menu.closeLoader();
                  this._menu.ToastErrors('No se pudo agregar al carrito');
                }, 800);
              }
            });
        break;
    }
  }
    // Obtener datos de un producto despues de haberlo añadido a la lista o carrito, para insertarlo en el arreglo
    GetProductInfo(productID: number): Promise<ObjectProductClass> {
      return new Promise((resolve, reject) => {
        this._product.GetAllProductData('selectNewProductAPI-ID', productID)
          .subscribe((data) => {
            if (data.status) {
              resolve(data.data[0]);
            } else {
              resolve(null);
              return;
            }
          });
      });
    }
      // TriggerCart By Jquery
  TriggerCartClick(id: string, prefix: string): void {
    $(`button[id=${prefix}-${id}]`).trigger('click');
    return;
  }
}
