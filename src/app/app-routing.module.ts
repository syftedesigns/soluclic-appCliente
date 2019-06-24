import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule', canActivate: [AuthGuard]},
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule', canActivate: [AuthGuard]},
  { path: 'explorer', loadChildren: './components/pages/explorer/explorer.module#ExplorerPageModule', canActivate: [AuthGuard]},
  { path: 'notify', loadChildren: './components/pages/notify/notify.module#NotifyPageModule', canActivate: [AuthGuard]},
  { path: 'orders', loadChildren: './components/pages/orders/orders.module#OrdersPageModule', canActivate: [AuthGuard]},
  { path: 'history', loadChildren: './components/pages/history/history.module#HistoryPageModule', canActivate: [AuthGuard]},
  { path: 'special', loadChildren: './components/pages/special/special.module#SpecialPageModule', canActivate: [AuthGuard]},
  { path: 'tab6', loadChildren: './tab6/tab6.module#Tab6PageModule', canActivate: [AuthGuard]},
  { path: 'store', loadChildren: './components/pages/store/store.module#StorePageModule', canActivate: [AuthGuard]},
  { path: 'product', loadChildren: './components/pages/product/product.module#ProductPageModule', canActivate: [AuthGuard]},
  { path: 'install-step', loadChildren: './components/pages/install-step/install-step.module#InstallStepPageModule' },
  { path: 'cart', loadChildren: './components/pages/cart/cart.module#CartPageModule', canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: './components/pages/public/public.module#PublicModule'},
  { path: 'find', loadChildren: './components/pages/find/find.module#FindPageModule', canActivate: [AuthGuard]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
