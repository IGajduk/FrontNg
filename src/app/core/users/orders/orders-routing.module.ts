import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {SingleOrderComponent} from './single-order/single-order.component';
import {EditOrderComponent} from './edit-order/edit-order.component';


const routes: Routes = [
  {path: '', component: AllOrdersComponent},
  {path: 'single/:id', component: SingleOrderComponent},
  {path: 'edit/:id', component: EditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
