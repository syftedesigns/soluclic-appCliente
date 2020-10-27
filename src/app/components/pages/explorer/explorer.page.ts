import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/db/product/product.service';
import { ObjectProductClass } from 'src/app/classes/store/product.class';
import { SOLUCLIC_IMAGE_URL } from '../../../API/api_url.class';
import { NgForm } from '@angular/forms';
import { ObjectSavedProductClass } from 'src/app/classes/store/productSaved.class';
import { AuthService } from '../../../services/auth/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.page.html',
  styleUrls: ['./explorer.page.scss'],
})
export class ExplorerPage implements OnInit {
  public CategoryId: number = 0;
  public productId: number = 0;
  public ProdList: ObjectProductClass[] = [];
  public CatName: string = '';
  public URL_IMG: string = SOLUCLIC_IMAGE_URL;
  public isLoading: boolean = false;
  // tslint:disable-next-line:variable-name
  constructor(private _menu: MenuService, private get: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _product: ProductService, private router: Router,
              public auth: AuthService) {
    this.get.params.subscribe(
      (categoryData) => {
        this.CategoryId = categoryData.category;
        this.productId = categoryData.product_id;
      }
    );
    this.get.queryParams.subscribe(
      (attributes) => {
        this.CatName = attributes.catname;
      }
    );
  }

  async ngOnInit() {
    setTimeout(() => {
      this._menu.isSearching = false;
    }, 300);
    this.isLoading = true;
    const productList = await this.GetProductsByPARAMS();
    if (productList !== null) {
      this.ProdList = productList;
      this.isLoading = false;
      console.log(this.ProdList);
    } else {
      this.isLoading = false;
      this._menu.ToastErrors('No hay información acerca de lo que necesitas');
      this.router.navigate(['/tabs/tab3']);
    }
  }
  GetProductsByPARAMS(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this._product.ProductsByExplorer('selectProductsByCategory', this.productId, this.CategoryId)
        .subscribe((prodList) => {
          if (prodList.status) {
            resolve(prodList.data);
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
