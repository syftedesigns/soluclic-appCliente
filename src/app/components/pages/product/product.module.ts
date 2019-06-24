import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductPage } from './product.page';
import { AngularMaterialModule } from '../../../angular-material.module';
import { DomSanatizerPipe } from '../../../services/pipes/dom-sanatizer.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularMaterialModule
  ],
  declarations: [
    ProductPage,
    DomSanatizerPipe
  ]
})
export class ProductPageModule {}
