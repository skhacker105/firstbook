import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryStoreComponent } from './inventory-store/inventory-store.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store/default',
    pathMatch: 'full'
  },
  {
    path: 'store/:query',
    component: InventoryStoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
