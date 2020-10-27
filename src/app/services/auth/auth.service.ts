import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { ObjectCustomerClass } from '../../classes/customer/customer.class';
import { MenuService } from '../menu/menu.service';
import { SOLUCLIC_API } from 'src/app/API/api_url.class';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ObjectProductClass } from 'src/app/classes/store/product.class';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public customerData: ObjectCustomerClass;
  public session: string;
  public SavedWishListItems: ObjectProductClass[] = [];
  public SavedCartItems: ObjectProductClass[] = [];
  public platformType: string = '';
  // tslint:disable-next-line:variable-name
  public _id: number;
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient, private sqlite: Storage,
              private platform: Platform, private menu: MenuService,
              private snackBar: MatSnackBar, private router: Router) {
                this.LoadStorage();
              }


    // Función que se encarga de devolver el tipo de plataforma que se esta desplegando la app
    GivePlatformInfo(): string {
        return (this.platform.is('cordova')) ? 'cordova' : 'web';
    }
    // Autenticar
    LoadStorage() {
      if (this.GivePlatformInfo() === 'cordova') {
        // storage
        console.log('native session');
        this.sqlite.get('sessionCustomer').then(
          (customerModel) => {
            if (customerModel !== '' && customerModel !== undefined && customerModel !== null) {
              this.customerData = JSON.parse(customerModel);
              this.session = this.customerData.token;
              this._id = Number(this.customerData.customer_id);
            } else {
              this.customerData = null;
              this.session = null;
              this._id = 0;
            }
          },
          (err) => {
            this.menu.ToastErrors('Error al acceder al sistema, estamos trabajando en ello!');
            throw new Error(err);
          }
        );
      } else {
        console.log('local session');
        this.customerData = JSON.parse(localStorage.getItem('sessionCustomer')) || null;
        this.session = localStorage.getItem('token') || null;
        this._id = Number(localStorage.getItem('customer_id')) || 0;
      }
    }
  // Verificamos si esta autenticado
  isLogged(): boolean {
    return ((this.customerData !== null) &&
       (this.customerData !== undefined) &&
       (this.session !== null) &&
       (this.session !== undefined) &&
       (this._id !== undefined) &&
       (this._id !== 0)) ? true : false;
  }
  // Registrar un nuevo usuario por primera vez
  RegisterNewCustomer(operationType: string, customerModel: ObjectCustomerClass) {
    const form = new FormData();
    form.append('firstname', customerModel.firstname);
    form.append('lastname', customerModel.lastname);
    form.append('email', customerModel.email);
    form.append('telephone', customerModel.telephone);
    form.append('store_id', customerModel.store_id);
    form.append('language_id', customerModel.language_id);
    form.append('fax', customerModel.telephone);
    form.append('password', customerModel.password);
    form.append('salt', customerModel.salt);
    form.append('cart', customerModel.cart);
    form.append('wishlist', customerModel.wishlist);
    form.append('newsletter', customerModel.newsletter);
    form.append('address_id', customerModel.address_id);
    form.append('custom_field', customerModel.custom_field);
    form.append('customer_group_id', customerModel.customer_group_id);
    form.append('ip', customerModel.ip);
    form.append('status', customerModel.status);
    form.append('safe', customerModel.safe);
    form.append('token', customerModel.token);
    form.append('code', customerModel.code);
    const url = `${SOLUCLIC_API}/loginCustomer.php?operationType=${operationType}`;
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
  // Guardar en el Storage los datos del cliente
  SaveStorage(customerModel: ObjectCustomerClass, token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.GivePlatformInfo() === 'cordova') {
        console.log('Guardamos en sqlite del telefono');
        // Guardamos en el sqlite
        this.sqlite.set('sessionCustomer', JSON.stringify(customerModel))
          .then(() => {
            console.log('Guardo en el sqlite');
            this.customerData = customerModel;
            this.session = token;
            this._id = Number(customerModel.customer_id);
            resolve(true);
          },
          (err) => {
            this.menu.ToastErrors('Error al acceder al sistema, estamos trabajando en ello!');
            throw new Error(err);
          });
      } else {
        console.log('Guardamos en el local Storage');
        localStorage.setItem('sessionCustomer', JSON.stringify(customerModel));
        localStorage.setItem('token', token);
        localStorage.setItem('customer_id', customerModel.customer_id);
        this.customerData = customerModel;
        this.session = token;
        this._id = Number(customerModel.customer_id);
        resolve(true);
      }
    });
  }
  // Cerrar sesíon
  Logout() {
    if (this.GivePlatformInfo() === 'cordova') {
      // Borra el Sqlite
      this.sqlite.remove('sessionCustomer').then(
        (onRemoved) => {
          alert(onRemoved);
          if (onRemoved) {
            this.customerData = null;
            this.session = null;
            this._id = 0;
            this.menu.snackBar.open('Tu cuenta ha sido cerrada', null, {duration: 4000});
            this.router.navigate(['/auth/login']);
          }
        }, (err) => {
          this.menu.ToastErrors('Error al acceder al procesar esta operación, estamos trabajando en ello!');
          throw new Error(err);
        }
      );
    } else {
      // Borra el local storage
      this.customerData = null;
      this.session = null;
      this._id = 0;
      localStorage.removeItem('sessionCustomer');
      localStorage.removeItem('token');
      localStorage.removeItem('customer_id');
      this.router.navigate(['/auth/login']);
    }
  }
  // Verificamos el tipo de plataforma
  public OperativeSystemVerification() {
    if (this.platform.is('android')) {
      return 'android';
    } else if (this.platform.is('ios')) {
      return 'ios';
    }
  }
}
