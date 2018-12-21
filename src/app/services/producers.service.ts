import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Producer} from '../models/Producer';

@Injectable({
  providedIn: 'root'
})
export class ProducersService {

  private host = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getProducerById(id: string): Observable<Producer> {
    return this.http.get<Producer>(`${this.host}producers/${id}`);
  }

  getAllProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(`${this.host}producers`);
  }

  createProducer(producer: Producer): Observable<Producer> {
    return this.http.post<Producer>(`${this.host}producers`, producer);
  }

  updateProducer(id: string, producer: Producer): Observable<Producer> {
    return this.http.put<Producer>(`${this.host}producers/${id}`, producer);
  }

  deleteProducer(id: string): Observable<Producer> {
    return this.http.delete<Producer>(`${this.host}producers/${id}`);
  }
}
