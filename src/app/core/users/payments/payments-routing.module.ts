import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllPaymentsComponent} from './all-payments/all-payments.component';
import {SinglePaymentComponent} from './single-payment/single-payment.component';
import {EditPaymentComponent} from './edit-payment/edit-payment.component';

const routes: Routes = [
  {path: '', component: AllPaymentsComponent},
  {path: 'single/:id', component: SinglePaymentComponent},
  {path: 'edit/:id', component: EditPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
