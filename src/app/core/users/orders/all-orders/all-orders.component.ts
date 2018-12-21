import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Ord} from '../../../../models/Ord';
import {OrdersService} from '../../../../services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{

  orders: Ord[] = [];

constructor(
  private ordersService: OrdersService) {
}

ngOnInit() {
  this.getOrders();
}
private getOrders() {
  this.ordersService.getAllOrders().subscribe((res) => {
    this.orders = res ? res : [];
  });
}

removeOrder(order: Ord) {
  this.ordersService.deleteOrder(order._id).subscribe(() => {
    this.getOrders();
  });
}

createOrdr(orderForm: NgForm) {
  this.ordersService.createOrder(orderForm.value).subscribe((newOrder) => {
    this.orders.push(newOrder);
  });
}


}
