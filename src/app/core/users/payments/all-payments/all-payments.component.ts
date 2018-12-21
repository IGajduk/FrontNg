import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Payment} from '../../../../models/Payment';
import {PaymentsService} from '../../../../services/payments.service';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {

  payments: Payment[] = [];

  constructor(
    private paymentsService: PaymentsService) {
  }

  ngOnInit() {
    this.getPayment();
  }
  private getPayment() {
    this.paymentsService.getAllPayments().subscribe((res) => {
      this.payments = res ? res : [];
    });
  }

  removePayment(payment: Payment) {
    this.paymentsService.deletePayment(payment._id).subscribe(() => {
      this.getPayment();
    });
  }

  createPay(paymentForm: NgForm) {
    this.paymentsService.createPayment(paymentForm.value).subscribe((newUser) => {
      this.payments.push(newUser);
    });
  }

}
