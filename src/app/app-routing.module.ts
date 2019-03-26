import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthAdminGuard} from './auth.guard';
import {AuthUserGuard} from './authUser.guard';
import {ImagesByProductComponent} from './core/images/images-by-product/images-by-product.component';



const routes: Routes = [
  {path: 'categories', loadChildren: './core/categories/categories.module#CategoriesModule'},
  {path: 'users', loadChildren: './core/users/users.module#UsersModule'},
  {path: 'orders', loadChildren: './core/users/orders/orders.module#OrdersModule'},
  {path: 'producers', loadChildren: './core/categories/producers/producers.module#ProducersModule'},
  {path: 'products', loadChildren: './core/categories/all-categories/products/products.module#ProductsModule'},
  {path: 'comments', loadChildren: './core/categories/comments/comments.module#CommentsModule', canActivate: [AuthUserGuard]},
  {path: 'payments', loadChildren: './core/users/payments/payments.module#PaymentsModule', canActivate: [AuthAdminGuard]},
  {path: 'login', loadChildren: './core/login/login.module#LoginModule'},
  {path: 'images/:id', component: ImagesByProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

