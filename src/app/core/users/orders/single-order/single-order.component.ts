import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ord} from '../../../../models/Ord';
import {OrdersService} from '../../../../services/orders.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

  @Input() orderInput: Ord = new Ord();

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => this.getOById(res));
  }

  private getOById(params) {
    if (params.id) {
      this.ordersService.getOrderById(params.id).subscribe(res => {
        this.orderInput = res;
      });
    }
  }
}
