import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AngularMaterialModule } from '../angular-material.module';
import { StaticModule } from '../components/static/static.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AngularMaterialModule,
    StaticModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
