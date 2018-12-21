import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Payment} from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {


  private host = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.host}payments/${id}`);
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.host}payments`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.host}payments`, payment);
  }

  updatePayment(id: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.host}payments/${id}`, payment);
  }

  deletePayment(id: string): Observable<Payment> {
    return this.http.delete<Payment>(`${this.host}payments/${id}`);
  }
}
