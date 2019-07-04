import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../../../../services/db/product/product.service';
import { ObjectProductClass } from 'src/app/classes/store/product.class';
import { NgForm } from '@angular/forms';
import { MenuService } from '../../../../services/menu/menu.service';
import { ObjectSavedProductClass } from 'src/app/classes/store/productSaved.class';
import { AuthService } from '../../../../services/auth/auth.service';
import { SOLUCLIC_IMAGE_URL } from 'src/app/API/api_url.class';
import * as $ from 'jquery';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  SpecialItems: ObjectProductClass[] = [];
  public URL_IMG: string = SOLUCLIC_IMAGE_URL;

  // tslint:disable-next-line:variable-name
  constructor(public modal: ModalController, private _product: ProductService, private _menu: MenuService,
              public auth: AuthService) { }

  async ngOnInit() {
    const items = await this.OffersItems();
    if (items !== null) {
      this.SpecialItems = items;
      console.log(this.SpecialItems);
    }
  }

  OffersItems(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this._product.GetAllProductData('selectProductsNewAPIDiscount')
        .subscribe((data) => {
          if (data.status) {
            // Significa que hay ofertas en la semana
            resolve(data.data);
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
        // this._menu.OpenLoader('Guardando en favoritos...');
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
                 // this._menu.closeLoader();
                 this._menu.ToastErrors('Artículo guardado como favorito');
               }, 800);
              }
            } else {
              setTimeout(() => {
                // this._menu.closeLoader();
                this._menu.ToastErrors('Este artículo ya esta en tu lista');
              }, 800);
            }
          });
        break;
        // carrito
        case 'cart':
        // this._menu.OpenLoader('Agrengado artículo al carrito...');
        const CartItem = new ObjectSavedProductClass(prefix.customer_id, prefix.session, prefix.product_id,
          prefix.recurring_id, prefix.option, prefix.quantity, null, prefix.api_id);
        this._product.SaveProduct('addItem', CartItem)
            .subscribe(async (cart) => {
              if (cart.status) {
                // Si guardo en la lista de favoritos, hacemos un push en el servicio
                const cartProductInfo = await this.GetProductInfo(cart.object.product_id);
                if (cartProductInfo !== null) {
                  this.auth.SavedCartItems.unshift(cartProductInfo);
                  this._product.QtyItems++;
               // Tenemos los datos del producto entonces hacermos el push
                  setTimeout(() => {
                      // this._menu.closeLoader();
                      this._menu.ToastErrors('Artículo guardado al carrito');
                    }, 800);
              }
              } else {
                setTimeout(() => {
                  // this._menu.closeLoader();
                  this._menu.ToastErrors('No se pudo agregar al carrito');
                }, 800);
              }
            });
        break;
    }
  }
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
  TriggerCartClick(id: string, prefix: string): void {
    $(`button[id=${prefix}-${id}]`).trigger('click');
    return;
  }
}
