import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/db/product/product.service';
import { ObjectManufacturerClass } from '../classes/store/manufacturer.class';
import { SOLUCLIC_IMAGE_URL } from '../API/api_url.class';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public StoresData: ObjectManufacturerClass[] = [];
  public SOLUCLIC_URL = SOLUCLIC_IMAGE_URL;

  constructor(private route: Router, private prodData: ProductService) {
  }
  async ngOnInit() {
    const Stores = await this.AllManufacturers();
    if (Stores !== null) {
      this.StoresData = Stores;
      console.log(this.StoresData);
    }
  }
  NavigateToStore(objectStore: ObjectManufacturerClass) {
    this.route.navigate([`/tabs/store/${objectStore.manufacturer_id}/${objectStore.name}`], {
      queryParams: {
        brand: objectStore.image
      },
    });
  }
  AllManufacturers(): Promise<ObjectManufacturerClass[]> {
    return new Promise((resolve, reject) => {
      this.prodData.StoreFind('manufacturer')
        .subscribe((manufacturer) => {
          if (manufacturer && manufacturer.length >= 1) {
            resolve(manufacturer);
          } else {
            resolve(null);
          }
        });
    });
  }
}
