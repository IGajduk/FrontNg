import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Payment} from '../../../../models/Payment';
import {PaymentsService} from '../../../../services/payments.service';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {

  payment: Payment = new Payment();

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentsService: PaymentsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.payment = <Payment>data;
    });
  }

  updatePay(paymentForm: NgForm) {
    this.payment = {...this.payment, ...paymentForm.value};
    this.paymentsService.updatePayment(this.payment._id, this.payment).subscribe((res) => {
      this.payment = res;
      this.router.navigate([`payments/single/${this.payment._id}`], {});
    });
  }


}
