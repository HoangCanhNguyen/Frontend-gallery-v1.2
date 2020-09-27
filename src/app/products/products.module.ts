import { NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductCommentComponent } from './product-detail/product-comment/product-comment.component';
import { ProductReplyComponent } from './product-detail/product-comment/product-reply/product-reply.component';
import { FilterComponent } from './product-list/filter/filter.component';

import { PictureFilterPipe } from './product-list/filter.pipe';
import { ProductsResolverService } from '../shared/service/products-resolver.service';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '', component: ProductListComponent,
        resolve: {
          pictureResolver: ProductsResolverService
        }

      },
      {
        path: ':id/:category/:pic_name',
        component: ProductDetailComponent,
        resolve: {
          pictureByIdResolver: ProductsResolverService
        }
      },
    ],
  },
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductItemComponent,
    FilterComponent,
    ProductCommentComponent,
    ProductReplyComponent,
    PictureFilterPipe
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    Ng5SliderModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(productRoutes),
  ],
  exports: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductItemComponent,
    FilterComponent,
    ProductCommentComponent,
    ProductReplyComponent
  ]
})
export class ProductsModule { }