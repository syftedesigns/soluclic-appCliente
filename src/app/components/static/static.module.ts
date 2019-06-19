import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AngularMaterialModule } from '../../angular-material.module';
import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MenuComponent,
    ToolbarComponent,
    TabsComponent
  ],
  entryComponents: [
    MenuComponent,
    ToolbarComponent,
    TabsComponent
  ],
  exports: [
    MenuComponent,
    ToolbarComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class StaticModule { }
