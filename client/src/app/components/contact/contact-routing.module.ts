import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactStoreComponent } from './contact-store/contact-store.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store/default',
    pathMatch: 'full'
  },
  {
    path: 'store/:query',
    component: ContactStoreComponent
  },
  // {
  //   path: 'details/:bookId',
  //   component: BookDetailsComponent
  // },
  // {
  //   path: 'create',
  //   canActivate: [IsAdminGuard],
  //   component: BookCreateComponent
  // },
  // {
  //   path: 'edit/:bookId',
  //   canActivate: [IsAdminGuard],
  //   component: BookEditComponent
  // },
  // {
  //   path: 'delete/:bookId',
  //   canActivate: [IsAdminGuard],
  //   component: BookDeleteComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
