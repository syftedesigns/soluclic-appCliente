import { Component, OnInit } from '@angular/core';
import { DirService } from '../../../services/auth/dir.service';
import { MenuService } from '../../../services/menu/menu.service';
import { ObjectCountryClass, ObjectRegionClass } from '../../../classes/global/countries.class';
import { ObjectAddrClass } from '../../../classes/customer/customer.addr.class';
import { AuthService } from '../../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  Countries: ObjectCountryClass[] = []; // Carga los paises
  Zones: ObjectRegionClass[] = []; // Carga las zonas según los paises
  // Creamos una dirección nula, por si tiene una dirección cargada el Ngmodel no tire un undefined
  DirDefault: ObjectAddrClass = new ObjectAddrClass(this.auth._id.toString(), '', '', '', '', '', '', '', '', '', '', '');
  operation: string = 'create';
  Addr: string; // ID de la dirección si esta creada
  constructor(private addr: DirService, public global: MenuService,
              private auth: AuthService, public bottomSheet: MatBottomSheetRef<ProfileComponent>) { }

  async ngOnInit() {
    const countries = await this.LoadCountries();
    if (countries !== null) {
      this.Countries = countries;
    }
    // Identificamos si tenemos ya una ruta creada
    this.LoadAddrByCustomer().then((addr) => {
      if (addr !== null) {
        this.DirDefault = addr[0];
        this.Addr = addr[0].address_id;
        this.operation = 'update';
      }
    });
  }
  // tslint:disable-next-line:variable-name
  // Cargamos los paises
  LoadCountries(): Promise<ObjectCountryClass[]> {
    return new Promise((resolve, reject) => {
      this.addr.GetAnyThingByPrefix('address.php', 'getAllCountries')
        .subscribe((data) => {
          if (data) {
            resolve(data);
          } else {
            resolve(null);
            return;
          }
        });
    });
  }
  async LoadRegion(value: any) {
    console.log(value);
    this.addr.GetAnyThingByPrefix('address.php', 'getRegion', value.value, 'country_id')
      .subscribe((data) => {
        if (data) {
          this.Zones = data;
        } else {
          return;
        }
      });
  }
  async FormValue(formDir: NgForm) {
    if (formDir.invalid) {
      this.global.snackBar.open('El formulario es incorrecto', null, {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      throw new Error('form invalid');
    }
    this.global.OpenLoader('Registrando tu dirección');
    const DirObject = new ObjectAddrClass(this.auth._id.toString(), formDir.value.firstname,
    formDir.value.lastname, formDir.value.company, formDir.value.address_1, formDir.value.address_2,
    formDir.value.city, formDir.value.postcode, formDir.value.country_id, formDir.value.zone_id,
    formDir.value.custom_field);
    if (this.operation === 'create') {
      // Significa que no tiene dirección
      if (await this.CreateOrUpdate(DirObject, 'createAddr')) {
        // Creo la dirección
        this.global.snackBar.open('Dirección creada con éxito', null, {duration: 4000});
        setTimeout(() => {
          this.global.closeLoader();
        }, 1000);
        this.bottomSheet.dismiss(null);
      }
    } else {
      // Significa que va actualizar la dirección
      DirObject.address_id = this.Addr; // Seteamos la Dirección en el objeto creado antes
      if (await this.CreateOrUpdate(DirObject, 'updateAddr')) {
        // Actualizo la dirección
        this.global.snackBar.open('Dirección actualizada con éxito', null, {duration: 4000});
        setTimeout(() => {
          this.global.closeLoader();
        }, 1000);
        this.bottomSheet.dismiss(null);
      }

    }
  }
  CreateOrUpdate(dirData: ObjectAddrClass, operationType: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.addr.CreateOrUpdateAddress(dirData, operationType)
        .subscribe((data) => {
          if (data.status) {
            resolve(true);
          }
        });
    });
  }
  LoadAddrByCustomer(): Promise<ObjectAddrClass> {
    return new Promise((resolve, reject) => {
      this.addr.GetAnyThingByPrefix('address.php', 'getAddressNewApi', this.auth._id.toString(), 'customer_id')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.data);
          } else {
            resolve(null);
          }
        });
    });
  }
}
