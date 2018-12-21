import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllCategoriesComponent} from './all-categories/all-categories.component';
import {UpdateCategoryComponent} from './all-categories/update-category/update-category.component';
import {ProductsByCategoryIdComponent} from './all-categories/products-by-category-id/products-by-category-id.component';

const routes: Routes = [
  {path: '', component: AllCategoriesComponent},
  {path: 'products/:id', component: ProductsByCategoryIdComponent},
  {path: 'single-edit/:id', component: UpdateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
