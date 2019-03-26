import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  createCategory(category: Category, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('title', category.title);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(image);
    return this.http.post<Category>(`${this.host}categories`, fd, {headers: headers});
  }
  updateCategory(id: string, category: Category, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('title', category.title);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.put<Category>(`${this.host}categories/${id}`, fd, {headers: headers});
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.host}categories/${id}`);
  }

  getProductsByCategoryId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}productsByCategory/${id}`);
  }
}
