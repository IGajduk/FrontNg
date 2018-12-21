import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {NgForm} from '@angular/forms';
import {Ord} from '../../../../models/Ord';
import {OrdersService} from '../../../../services/orders.service';



@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Ord = new Ord();

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.order = <Ord>data;
    });
  }

  updateUs(orderForm: NgForm) {
    this.order = {...this.order, ...orderForm.value};
    this.ordersService.updateOrder(this.order._id, this.order).subscribe((res) => {
      this.order = res;
      this.router.navigate([`orders/single/${this.order._id}`], {});
    });
  }



}
