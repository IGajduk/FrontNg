import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Category} from '../models/Category';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private host = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.host}categories/${id}`);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.host}categories`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.host}categories`, category);
  }

  update(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.host}categories/${id}`, category);
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.host}categories/${id}`);
  }

  getProductsByCategoryId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}productsByCategory/${id}`);
  }
}
