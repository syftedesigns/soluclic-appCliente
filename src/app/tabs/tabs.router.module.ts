import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ],
        data: {showCategoriesMenu: false}
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ],
        data: {showCategoriesMenu: false}
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ],
        data: {showCategoriesMenu: true}
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          }
        ],
        data: {showCategoriesMenu: false}
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: '../tab5/tab5.module#Tab5PageModule'
          }
        ],
        data: {showCategoriesMenu: false}
      },
      {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: '../tab6/tab6.module#Tab6PageModule'
          }
        ],
        data: {HideMenu: true}
      },
      // Internal pages
      {
        path: 'explorer',
        children: [
          {
            path: '',
            loadChildren: '../components/pages/explorer/explorer.module#ExplorerPageModule'
          }
        ]
      },
      {
        path: 'history',
        children: [{
          path: '',
          loadChildren: '../components/pages/history/history.module#HistoryPageModule'
        }],
      },
      {
        path: 'notifications',
        children: [{
          path: '',
          loadChildren: '../components/pages/notify/notify.module#NotifyPageModule'
        }],
      },
      {
        path: 'orders',
        children: [{
          path: '',
          loadChildren: '../components/pages/orders/orders.module#OrdersPageModule'
        }],
      },
      {
        path: 'special',
        children: [{
          path: '',
          loadChildren: '../components/pages/special/special.module#SpecialPageModule'
        }],
      },
      {
        path: 'store/:manufacturer_id',
        children: [{
          path: '',
          loadChildren: '../components/pages/store/store.module#StorePageModule'
        }]
      },
      {
        path: 'product/:product_id',
        children: [{
          path: '',
          loadChildren: '../components/pages/product/product.module#ProductPageModule'
        }]
      },
      {
        path: 'checkout/startup',
        children: [{
          path: '',
          loadChildren: '../components/pages/install-step/install-step.module#InstallStepPageModule'
        }]
      },
      {
        path: 'cart',
        children: [{
          path: '',
          loadChildren: '../components/pages/cart/cart.module#CartPageModule'
        }],
      },
      // end internal
      {
        path: '',
        redirectTo: '/tabs/tab3',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab3',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
