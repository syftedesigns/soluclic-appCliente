import { Injectable } from '@angular/core';
import { SOLUCLIC_API } from 'src/app/API/api_url.class';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material';
import { ObjectAddrClass } from '../../classes/customer/customer.addr.class';
@Injectable({
  providedIn: 'root'
})
export class DirService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }


  GetAnyThingByPrefix(route: string, operationType: string, getParam?: string, searchParam?: string) {
    let url;
    if (getParam) {
      url = `${SOLUCLIC_API}/${route}?operationType=${operationType}&${searchParam}=${getParam}`;
    } else {
      url = `${SOLUCLIC_API}/${route}?operationType=${operationType}`;
    }
    console.log(url);
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
  // Crea o actualiza una dirección
  CreateOrUpdateAddress(ObjectAddr: ObjectAddrClass, operationType: string) {
    const url =  `${SOLUCLIC_API}/address.php?operationType=${operationType}`;
    const Form = new FormData();
    Form.append('customer_id', ObjectAddr.customer_id);
    Form.append('firstname', ObjectAddr.firstname);
    Form.append('lastname', ObjectAddr.lastname);
    Form.append('company', ObjectAddr.company);
    Form.append('address_1', ObjectAddr.address_1);
    Form.append('address_2', ObjectAddr.address_2);
    Form.append('city', ObjectAddr.city);
    Form.append('postcode', ObjectAddr.postcode);
    Form.append('country_id', ObjectAddr.country_id);
    Form.append('zone_id', ObjectAddr.zone_id);
    Form.append('custom_field', ObjectAddr.custom_field);
    Form.append('customer_id', ObjectAddr.customer_id);
    Form.append('address_id', ObjectAddr.address_id);
    return this._http.post(url, Form).pipe(
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
