import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllProductsComponent} from './all-products/all-products.component';
import {ProductComponent} from './product/product.component';
import {ProductEditComponent} from './product-edit/product-edit.component';

const routes: Routes = [
  {path: '', component: AllProductsComponent},
  {path: 'single/:id', component: ProductComponent},
  {path: 'edit/:id', component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {

}
