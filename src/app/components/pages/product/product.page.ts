import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectProductClass } from '../../../classes/store/product.class';
import { ProductService } from '../../../services/db/product/product.service';
import { MenuService } from '../../../services/menu/menu.service';
import { SOLUCLIC_IMAGE_URL } from '../../../API/api_url.class';
import { ObjectReviewClass } from 'src/app/classes/store/review.class';
import { ObjectFilterClass } from '../../../classes/store/filter.class';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  public ProductData: ObjectProductClass = null;
  public ProductId: number = 0;
  public productDescription = '';
  public StockQty: number = 1; // La cantidad minima por defecto del producto
  public ProductThumbnails: any[] = [];
  public SOLUCLIC_URL = SOLUCLIC_IMAGE_URL;
  public ArrayProductsRealted: ObjectProductClass[] = []; // Productos relacionados
  public ArrayProductsReviews: ObjectReviewClass[] = [];
  public ProductAverage: number = 0;
  public ArrayFilters: ObjectFilterClass[] = [];
  constructor(private get: ActivatedRoute, private prodData: ProductService, private router: Router,
              private menu: MenuService) {
    this.get.params.subscribe(
      (Params) => {
        this.ProductId = Number(Params.product_id);
      }
    );
  }

  async ngOnInit() {
    const productInfo = await this.GetProductData(); // data del producto
    this.ProductData = productInfo[0];
    this.productDescription = await this.GetDescriptionSanatized(); // descripción
    // Obtener la galeria para el slider
    const thumbnail = await this.GetProductThumbnails();
    if (thumbnail !== null) {
      this.ProductThumbnails = thumbnail;
    } else {
      this.ProductThumbnails = null;
    }
    // Los review
    const Reviews = await this.GetReviewForThisProduct();
    if (Reviews !== null) {
      this.ArrayProductsReviews = Reviews.reviews;
      this.ProductAverage = Reviews.average;
    } else {
      this.ArrayProductsReviews = null;
    }
    // Obtener productos relacionados
    const ArrayRelation: ObjectProductClass[] = await this.GetProductRelated();
    if (ArrayRelation !== null) {
      this.ArrayProductsRealted = ArrayRelation;
    }
    // Obtener los filtros del producto
    const Filters: ObjectFilterClass[] = await this.ProductFilters();
    if (Filters !== null) {
      this.ArrayFilters = Filters;
    } else {
      this.ArrayFilters = null;
    }
  }
  // Nos proporciona toda la información global del producto
  GetProductData(): Promise<ObjectProductClass> {
    return new Promise((resolve, reject) => {
      this.prodData.GetAllProductData('selectNewProductAPI-ID', this.ProductId)
        .subscribe((prodDB) => {
          if (prodDB.status) {
            resolve(prodDB.data);
          } else {
            this.router.navigate(['/tabs/tab3']);
            return;
          }
        }, () => {
          this.menu.ToastErrors('Se ha producido un error');
          this.router.navigate(['/tabs/tab3']);
          return;
        });
    });
  }
  // Función que limpia toda la descripción y la devuelve con una codificación valida
  GetDescriptionSanatized(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.prodData.GetAllProductData('getDescriptionIONIC', this.ProductId)
        .subscribe((description) => {
          resolve(description);
          return;
        });
    });
  }
  // Contador para limitar el stock
  LimitStock(operation: string): void {
    switch (operation) {
      case 'sum':
          if (this.StockQty >= 10) {
            return;
          } else {
            ++this.StockQty;
          }
          break;
      case 'sub':
          if (this.StockQty <= 1) {
            return;
          } else {
            --this.StockQty;
          }
          break;
    }
  }
  // Función que me devuelve todas las imagenes del producto para el slider
  GetProductThumbnails(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.prodData.GetAllProductData('selectImage', this.ProductId)
        .subscribe((thumbnails) => {
          if (thumbnails.status) {
            resolve(thumbnails.data);
          } else {
            resolve(null);
            return;
          }
        });
    });
  }
  // Función que me devuelve todos los productos relacionados
  GetProductRelated(): Promise<ObjectProductClass[]> {
    return new Promise((resolve, reject) => {
      const ArrayRelated = new Array();
      this.prodData.GetAllProductData('getProductRelatedAPI', this.ProductId)
        .subscribe((related) => {
          if (related.status) {
            for (const relation of related.data) {
              ArrayRelated.push(relation[0]);
            }
            resolve(ArrayRelated);
          } else {
            resolve(null);
            return;
          }
        });
    });
  }
  // Función que devuelve los review y el Average
  GetReviewForThisProduct(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prodData.GetAllProductData('getProductReviews', this.ProductId)
        .subscribe((review) => {
            if (review.status) {
              resolve({
                reviews: review.data,
                average: review.average
              });
            } else {
              resolve(null);
              return;
            }
        });
    });
  }
  // Estrellas en el DOM
  ReturnStarOnProduct(starCount: string): string {
    switch (starCount) {
      case 'star1':
          if (this.ProductAverage >= 1) {
            return 'star';
          } else {
            return 'star-outline';
          }
      case 'star2':
        if (this.ProductAverage >= 2) {
          return 'star';
        } else {
          return 'star-outline';
        }
      case 'star3':
        if (this.ProductAverage >= 3) {
          return 'star';
        } else {
          return 'star-outline';
        }
      case 'star4':
        if (this.ProductAverage >= 4) {
          return 'star';
        } else {
          return 'star-outline';
        }
      case 'star5':
        if (this.ProductAverage >= 5) {
          return 'star';
        } else {
          return 'star-outline';
        }
    }
  }
  // Función que devuelve los filtros y caracteristicas del producto
  ProductFilters(): Promise<ObjectFilterClass[]> {
    return new Promise((resolve, reject) => {
      this.prodData.GetAllProductData('GetProductFiltersByIdAPI', this.ProductId)
        .subscribe((filters) => {
          if (filters.status) {
            resolve(filters.data);
          } else {
            resolve(null);
          }
        });
    });
  }
}
