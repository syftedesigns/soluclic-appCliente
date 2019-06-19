import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public.routes';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AngularMaterialModule } from '../../../angular-material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule,
    RouterModule,
    IonicModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class PublicModule { }
