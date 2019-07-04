import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLUCLIC_API } from 'src/app/API/api_url.class';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material';
import { ObjectSavedProductClass } from '../../../classes/store/productSaved.class';
import { ObjectProductClass } from '../../../classes/store/product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Favorites: ObjectProductClass[] = []; // Guardamos los productos en favoritos
  CartItems: ObjectProductClass[] = []; // Guardamos los productos del carrito en favoritos
  QtyItems: number = 0; // Items agregados al carrito
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }
  // tslint:disable-next-line:variable-name
  GetAllProductData(operationType: string, product_id?: number) {
    let url;
    if (product_id) {
      url = `${SOLUCLIC_API}/products.php?operationType=${operationType}&product_id=${product_id}`;
    } else {
      url = `${SOLUCLIC_API}/products.php?operationType=${operationType}`;
    }
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Explorador de productos
  GetProductsBySearch(keyword: string, operationType: string) {
    const url = `${SOLUCLIC_API}/products.php?operationType=${operationType}&keyword=${keyword}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // tslint:disable-next-line:variable-name
  StoreFind(operationType: string, manufacturer_id?: number | string) {
    let url;
    if (manufacturer_id) {
      url = `${SOLUCLIC_API}/items.php?operationType=${operationType}&manufacturer_id=${manufacturer_id}`;
    } else {
      url = `${SOLUCLIC_API}/items.php?operationType=${operationType}`;
    }
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Productos según tienda y categoria
  // tslint:disable-next-line:variable-name
  ProductsByStoreAndCategory(operationType, manufacturer_id: number, category_id: number) {
    let url;
    url = `${SOLUCLIC_API}/products.php?operationType=${operationType}`;
    url += `&manufacturer_id=${manufacturer_id}&category_id=${category_id}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // tslint:disable-next-line:variable-name
  ProductsByExplorer(operationType, product_id: number, category_id: number) {
    let url;
    url = `${SOLUCLIC_API}/products.php?operationType=${operationType}`;
    url += `&product_id=${product_id}&category_id=${category_id}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Gyardar en el carrito, o una wishlist
  SaveProduct(operationType: string, cart: ObjectSavedProductClass) {
    const url = `${SOLUCLIC_API}/cart.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('customer_id', cart.customer_id);
    form.append('session', cart.session_id);
    form.append('product_id', cart.product_id.toString());
    form.append('quantity', cart.quantity);
    form.append('option', cart.option);
    form.append('recurring_id', cart.recurring_id);
    form.append('api_id', cart.cart_id);
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  // Obtener información del carrito o Wishlist
  ProductSaveFind(operationType: string, withParams?: string) {
    let url;
    if (withParams) {
      url = `${SOLUCLIC_API}/cart.php?operationType=${operationType}&${withParams}`;
    } else {
      url = `${SOLUCLIC_API}/cart.php?operationType=${operationType}`;
    }
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
}
