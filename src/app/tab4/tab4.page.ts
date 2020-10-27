import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/db/product/product.service';
import { AuthService } from '../services/auth/auth.service';
import { MenuService } from '../services/menu/menu.service';
import { ObjectProductClass } from '../classes/store/product.class';
import { SOLUCLIC_IMAGE_URL } from '../API/api_url.class';
import { NgForm } from '@angular/forms';
import { ObjectSavedProductClass } from '../classes/store/productSaved.class';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  Favorites: ObjectProductClass[] = [];
  URL_IMG: string = SOLUCLIC_IMAGE_URL;
  isLoading: boolean = false;
  // tslint:disable-next-line:variable-name
  constructor(public _product: ProductService, public auth: AuthService,
              // tslint:disable-next-line:variable-name
              private _menu: MenuService) { }

  async ngOnInit() {
    this.isLoading = true;
    const WishList = await this.GetProductsWishList();
    if (WishList !== null) {
      // Colocamos los productos en un servicio ya que con los tabs, no esta refrescando de forma automatica
      this._product.Favorites = WishList;
      this.Favorites = this._product.Favorites;
      this.isLoading = false;
      console.log(this.Favorites);
    } else {
      this.Favorites = null;
      this.isLoading = false;
      this._menu.ToastErrors('No hay productos guardados');
    }
  }
  GetProductsWishList(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      const ArrayFavorites: ObjectProductClass[] = new Array();
      this._product.ProductSaveFind('getWishList', `customer_id=${this.auth._id}`)
        .subscribe((saved) => {
          if (saved.status) {
            for (const favorite of saved.data) {
              ArrayFavorites.push(favorite[0]);
            }
            resolve(ArrayFavorites);
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
    // TriggerCart By Jquery
    TriggerCartClick(id: string, prefix: string): void {
      $(`button[id=${prefix}-${id}]`).trigger('click');
      return;
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
}
