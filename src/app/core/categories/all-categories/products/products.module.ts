import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {FormsModule} from '@angular/forms';
import {AllProductsComponent} from './all-products/all-products.component';
import {ProductComponent} from './product/product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SingleProductComponent } from './single-product/single-product.component';

@NgModule({
  declarations: [AllProductsComponent, ProductComponent, ProductEditComponent, SingleProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ],
  exports: [AllProductsComponent, ProductComponent, SingleProductComponent]
})
export class ProductsModule { }
