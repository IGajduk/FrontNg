import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AllOrdersComponent, SingleOrderComponent, EditOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule
  ]
})
export class OrdersModule { }
