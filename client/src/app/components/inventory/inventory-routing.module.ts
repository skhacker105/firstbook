import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryStoreComponent } from './inventory-store/inventory-store.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store/default',
    pathMatch: 'full'
  },
  {
    path: 'store/:query',
    component: InventoryStoreComponent
  },
  {
    path: 'create',
    component: ProductCreateComponent
  },
  {
    path: 'edit/:productId',
    component: ProductCreateComponent
  },
  {
    path: 'detail/:productId',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
