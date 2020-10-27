import { Component, OnInit } from '@angular/core';
import { ObjectProductClass } from '../../../classes/store/product.class';
import { ProductService } from '../../../services/db/product/product.service';
import { MenuService } from '../../../services/menu/menu.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { SOLUCLIC_IMAGE_URL } from '../../../API/api_url.class';
import { NgForm } from '@angular/forms';
import { ObjectSavedProductClass } from 'src/app/classes/store/productSaved.class';
import * as $ from 'jquery';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  CartItems: ObjectProductClass[] = [];
  SOLUCLIC_URL: string = SOLUCLIC_IMAGE_URL;
  // tslint:disable-next-line:variable-name
  constructor(private _product: ProductService, private menu: MenuService,
              public auth: AuthService, private confirm: AlertController) { }

  async ngOnInit() {
    const Cart = await this.GetCartItems();
    if (Cart !== null) {
      this.auth.SavedCartItems = Cart;
      this.CartItems = this.auth.SavedCartItems;
      console.log(this.CartItems);
    } else {
      this.auth.SavedCartItems = null;
    }
  }
  GetCartItems(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      const CartItems: ObjectProductClass[] = new Array();
      this._product.ProductSaveFind('getItems', `token=${this.auth.session}`)
        .subscribe((cart) => {
          if (cart.status) {
            for (const item of cart.data) {
              CartItems.push(item[0]);
            }
            resolve(CartItems);
          } else {
            resolve(null);
            this.menu.ToastErrors('No hay productos en el carrito');
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
        this.menu.OpenLoader('Guardando en favoritos...');
        const WishList = new ObjectSavedProductClass(prefix.customer_id, null, prefix.product_id,
          null, null, null, null, null, null);
        this._product.SaveProduct('addWishItem', WishList)
          .subscribe((favorite) => {
            if (favorite.status) {
              setTimeout(() => {
                this.menu.closeLoader();
                this.menu.ToastErrors('Artículo guardado como favorito');
              }, 800);
            } else {
              setTimeout(() => {
                this.menu.ToastErrors('Este artículo ya esta en tu lista');
                this.menu.closeLoader();
              }, 800);
            }
          });
        break;
        // carrito
        case 'cart':
        this.menu.OpenLoader('Agrengado artículo al carrito...');
        const CartItem = new ObjectSavedProductClass(prefix.customer_id, prefix.session, prefix.product_id,
          prefix.recurring_id, prefix.option, prefix.quantity, null, prefix.api_id);
        this._product.SaveProduct('addItem', CartItem)
            .subscribe((cart) => {
              if (cart.status) {
                setTimeout(() => {
                  this.menu.closeLoader();
                  this.menu.ToastErrors('Artículo Agregado al carrito');
                }, 800);
              } else {
                setTimeout(() => {
                  this.menu.closeLoader();
                  this.menu.ToastErrors('No se pudo agregar al carrito');
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
    // tslint:disable-next-line:variable-name
    async DeleteCartItem(product_id: string, index: number) {
      const alert = await this.confirm.create({
        header: 'Mensaje de confirmación',
        message: '<mat-hint>¿Estás seguro que deseas eliminar este artículo del carrito?</mat-hint>',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
            handler: (blah) => {
              return;
            }
          }, {
            text: 'Confirmar',
            handler: async () => {
              console.log('eliminamos');
              if (await this.RemoveItemFromCart(product_id)) {
                this.menu.ToastErrors('Artículo eliminado del carrito');
                this.auth.SavedCartItems.splice(index, 1);
                this._product.QtyItems--;
                this.CartItems = this.auth.SavedCartItems;
              }
            }
          }
        ]
      });
      await alert.present();
    }
    RemoveItemFromCart(productId: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this._product.ProductSaveFind('delItem', `token=${this.auth.session}&product_id=${productId}`)
          .subscribe((del) => {
            if (del.status) {
              resolve(true); // elimino
            } else {
              resolve(false); // No pudo
            }
          });
      });
    }
}
