import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'explorer', loadChildren: './components/pages/explorer/explorer.module#ExplorerPageModule' },
  { path: 'notify', loadChildren: './components/pages/notify/notify.module#NotifyPageModule' },
  { path: 'orders', loadChildren: './components/pages/orders/orders.module#OrdersPageModule' },
  { path: 'history', loadChildren: './components/pages/history/history.module#HistoryPageModule' },
  { path: 'special', loadChildren: './components/pages/special/special.module#SpecialPageModule' },
  { path: 'tab6', loadChildren: './tab6/tab6.module#Tab6PageModule' },
  { path: 'store', loadChildren: './components/pages/store/store.module#StorePageModule' },
  { path: 'product', loadChildren: './components/pages/product/product.module#ProductPageModule' },
  { path: 'install-step', loadChildren: './components/pages/install-step/install-step.module#InstallStepPageModule' },
  { path: 'cart', loadChildren: './components/pages/cart/cart.module#CartPageModule' },
  { path: 'auth', loadChildren: './components/pages/public/public.module#PublicModule'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
