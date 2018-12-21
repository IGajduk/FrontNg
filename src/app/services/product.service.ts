import { Injectable } from '@angular/core';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.host}products/${id}`);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}products`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}products`, product);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}products/${id}`, product);
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.host}products/${id}`);
  }

}
