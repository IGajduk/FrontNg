import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {FormsModule} from '@angular/forms';
import {AllProductsComponent} from './all-products/all-products.component';
import {ProductComponent} from './product/product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SingleProductComponent } from './single-product/single-product.component';
import {ColorProductComponent} from './color-product/color-product.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {AdminHeaderModule} from '../../../../elements_of_page/admin-header/admin-header.module';
import {MatTabsModule} from '@angular/material';
import { CropImageComponent } from './crop-image/crop-image.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductComponent,
    ProductEditComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ImageCropperModule,
    AdminHeaderModule,
    MatTabsModule
  ],
  entryComponents: [],
  exports: [AllProductsComponent, ProductComponent, SingleProductComponent]
})
export class ProductsModule { }
