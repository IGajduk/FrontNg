import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ord} from '../models/Ord';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private host = 'http://localhost:3000/';
  constructor(
    private http: HttpClient
  ) {
  }

  getOrderById(id: string): Observable<Ord> {
    return this.http.get<Ord>(`${this.host}orders/${id}`);
  }

  getAllOrders(): Observable<Ord[]> {
    return this.http.get<Ord[]>(`${this.host}orders`);
  }

  createOrder(order: Ord): Observable<Ord> {
    return this.http.post<Ord>(`${this.host}orders`, order);
  }

  updateOrder(id: string, order: Ord): Observable<Ord> {
    return this.http.put<Ord>(`${this.host}orders/${id}`, order);
  }

  deleteOrder(id: string): Observable<Ord> {
    return this.http.delete<Ord>(`${this.host}orders/${id}`);
  }

}
