// Decorators
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { CommentComponent } from './comment/comment.component';
import { CartComponent } from './cart/cart.component';
import { BookComponent } from './book/book.component';

// Directives
import { MustMatchDirective } from '../directives/must-match.directive';
import { IsUrlDirective } from '../directives/is-url.directive';
import { IsIsbnDirective } from '../directives/is-isbn.directive';

// Pipes
import { CommentTimePipe } from '../pipes/comment-time.pipe';
import { ShortenStringPipe } from '../pipes/shorten-string.pipe';
import { MatMenuModule } from '@angular/material/menu';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { ContactComponent } from './contact/contact.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SanitizerUrlPipe } from '../pipes/sanitizer-url.pipe';
import { PreviewComponent } from './preview/preview.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { ProductComponent } from './product/product.component';
import { ProductSpecificationComponent } from './product-specification/product-specification.component';
import { ImageViewComponent } from './image-view/image-view.component';

@NgModule({
  declarations: [
    CommentComponent,
    CartComponent,
    BookComponent,
    MustMatchDirective,
    IsUrlDirective,
    IsIsbnDirective,
    CommentTimePipe,
    ShortenStringPipe,
    ContactComponent,
    ConfirmationDialogComponent,
    SanitizerUrlPipe,
    PreviewComponent,
    InputDialogComponent,
    ProductComponent,
    ProductSpecificationComponent,
    ImageViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonToggleModule,
    CarouselModule
  ],
  exports: [
    CommentComponent,
    CartComponent,
    BookComponent,
    MustMatchDirective,
    IsUrlDirective,
    IsIsbnDirective,
    CommentTimePipe,
    ShortenStringPipe,
    ContactComponent,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    ConfirmationDialogComponent,
    MatButtonToggleModule,
    SanitizerUrlPipe,
    PreviewComponent,
    CarouselModule,
    InputDialogComponent,
    ProductComponent,
    ProductSpecificationComponent
  ]
})
export class SharedModule { }
