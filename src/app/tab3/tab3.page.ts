import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/db/product/product.service';
import { ObjectProductClass } from '../classes/store/product.class';
import { MenuService } from '../services/menu/menu.service';
import { SOLUCLIC_IMAGE_URL } from '../API/api_url.class';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import * as $ from 'jquery';
import { ObjectSavedProductClass } from '../classes/store/productSaved.class';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public sliderOpts: any = {
    autoplay: true,
    speed: 500
  };
  public sliderOpts2: any = {
    autoplay: true,
    speed: 800
  };
  public ArrayProducts: ObjectProductClass[] = [];
  public URL_IMG: string = SOLUCLIC_IMAGE_URL;
  // tslint:disable-next-line:variable-name
  constructor(private _product: ProductService, private _menu: MenuService,
              public auth: AuthService) {}

  async ngOnInit() {
    const dbProduct: ObjectProductClass[] = await this.GetAllProducts();
    if (dbProduct !== null) {
      this.ArrayProducts = dbProduct;
      console.log(this.ArrayProducts);
    } else {
      this._menu.ToastErrors('No hay productos en la base de datos');
      return;
    }
  }

  // Devolver todos los productos
  GetAllProducts(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this._product.GetAllProductData('selectProductsNewAPI')
        .subscribe((db) => {
          if (db.status) {
            resolve(db.data);
          } else {
            resolve(null);
            return;
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
          .subscribe((favorite) => {
            if (favorite.status) {
              setTimeout(() => {
                this._menu.closeLoader();
                this._menu.ToastErrors('Artículo guardado como favorito');
              }, 800);
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
            .subscribe((cart) => {
              if (cart.status) {
                setTimeout(() => {
                  this._menu.closeLoader();
                  this._menu.ToastErrors('Artículo Agregado al carrito');
                }, 800);
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
  // TriggerCart By Jquery
  TriggerCartClick(id: string, prefix: string): void {
    $(`button[id=${prefix}-${id}]`).trigger('click');
    return;
  }
  // Determina si un producto ya esta guardado para rellenar el corazon
  // tslint:disable-next-line:variable-name
    async VerifyIfProductIsSaved(customer_id: string, product_id: string) {
     return 'heart-empty';
  }
  // tslint:disable-next-line:variable-name
  DBProductWishList(customer_id: string, product_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._product.ProductSaveFind('getWishListNoData', `customer_id=${customer_id}&product_id=${product_id}`)
        .subscribe((saved) => {
          if (saved.status) {
            // Esta ya guardado
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
