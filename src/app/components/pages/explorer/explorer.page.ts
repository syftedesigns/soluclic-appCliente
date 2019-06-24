import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/db/product/product.service';
import { ObjectProductClass } from 'src/app/classes/store/product.class';
import { SOLUCLIC_IMAGE_URL } from '../../../API/api_url.class';

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
  constructor(private menu: MenuService, private get: ActivatedRoute,
              private productDB: ProductService, private router: Router) {
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
      this.menu.isSearching = false;
    }, 300);
    const productList = await this.GetProductsByPARAMS();
    if (productList !== null) {
      this.ProdList = productList;
      console.log(this.ProdList);
    } else {
      this.menu.ToastErrors('No hay información acerca de lo que necesitas');
      this.router.navigate(['/tabs/tab3']);
    }
  }
  GetProductsByPARAMS(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      this.productDB.ProductsByExplorer('selectProductsByCategory', this.productId, this.CategoryId)
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
}
