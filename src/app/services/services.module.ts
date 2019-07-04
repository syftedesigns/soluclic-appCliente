import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductService } from './db/product/product.service';
import { AngularMaterialModule } from '../angular-material.module';
import { DirService } from './auth/dir.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule
  ],
  providers: [
    MenuService,
    ProductService,
    DirService
  ]
})
export class ServicesModule { }
