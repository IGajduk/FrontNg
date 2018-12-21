import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../models/Payment';
import {ActivatedRoute} from '@angular/router';
import {PaymentsService} from '../../../../services/payments.service';

@Component({
  selector: 'app-single-payment',
  templateUrl: './single-payment.component.html',
  styleUrls: ['./single-payment.component.css']
})
export class SinglePaymentComponent implements OnInit {

 @Input() paymentInput: Payment = new Payment();


  constructor(
    private usersService: PaymentsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => this.getPaymentById(res));
  }

  private getPaymentById(params) {
    if (params.id) {
      this.usersService.getPaymentById(params.id).subscribe(res => {
        this.paymentInput = res;
      });
    }
  }
}
