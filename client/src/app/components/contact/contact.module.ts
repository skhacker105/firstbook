import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactStoreComponent } from './contact-store/contact-store.component';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [
    ContactStoreComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class ContactModule { }
