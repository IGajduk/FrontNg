import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {AllCategoriesComponent} from './all-categories/all-categories.component';
import {CategoryComponent} from './all-categories/category/category.component';
import {FormsModule} from '@angular/forms';
import {UpdateCategoryComponent} from './all-categories/update-category/update-category.component';
import {ProductsByCategoryIdComponent} from './all-categories/products-by-category-id/products-by-category-id.component';
import {ProductsModule} from './all-categories/products/products.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AllCategoriesComponent, CategoryComponent, UpdateCategoryComponent,
    ProductsByCategoryIdComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ProductsModule,
    HttpClientModule
  ]
})
export class CategoriesModule { }
