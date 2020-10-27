import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SharedModule } from '../components/shared/shared.module';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    AngularMaterialModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
