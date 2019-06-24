import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObjectManufacturerClass } from '../../../classes/store/manufacturer.class';
import { MenuService } from '../../../services/menu/menu.service';
import { ProductService } from '../../../services/db/product/product.service';
import { SOLUCLIC_IMAGE_URL } from 'src/app/API/api_url.class';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  ArrayManufacturers: ObjectManufacturerClass[] = [];
  ArrayDefault: ObjectManufacturerClass[] = [];
  public SOLUCLIC_IMAGE: string = SOLUCLIC_IMAGE_URL;
  constructor(public modal: ModalController, private menu: MenuService,
              private Manufacturer: ProductService) { }

  async ngOnInit() {
    const manufacturer = await this.GetAllManufacturers();
    if (manufacturer !== null) {
      this.ArrayManufacturers = manufacturer;
      this.ArrayDefault = manufacturer;
    }
  }
  GetAllManufacturers(): Promise<ObjectManufacturerClass[]> {
    return new Promise((resolve, reject) => {
      this.Manufacturer.StoreFind('manufacturer')
        .subscribe((manufacturer) => {
          if (manufacturer) {
            resolve(manufacturer);
          } else {
            resolve(null);
          }
        });
    });
  }
  async FindStores(value: string) {
    const manufacturers = await this.GetStoreByKeyword(value);
    if (manufacturers !== null) {
      this.ArrayManufacturers = manufacturers;
      return;
    } else {
      this.ArrayManufacturers = this.ArrayDefault;
      return;
    }
  }
  GetStoreByKeyword(keyword: string): Promise<ObjectManufacturerClass[]> {
    return new Promise((resolve, reject) => {
      if (keyword) {
        this.Manufacturer.StoreFind('ExplorerStores', keyword)
          .subscribe((explorer) => {
            if (explorer.status) {
              resolve(explorer.data);
            } else {
              resolve(null);
              return;
            }
          });
      }
    });
  }
  ClearArray() {
    this.ArrayManufacturers = this.ArrayDefault;
    return;
  }
}
