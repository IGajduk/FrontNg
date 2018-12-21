import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { SinglePaymentComponent } from './single-payment/single-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AllPaymentsComponent, SinglePaymentComponent, EditPaymentComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule
  ]
})
export class PaymentsModule { }
