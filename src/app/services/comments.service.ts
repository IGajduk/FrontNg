import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coment} from '../models/Coment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private host = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getCommentById(id: string): Observable<Coment> {
    return this.http.get<Coment>(`${this.host}comments/${id}`);
  }

  getAllComments(): Observable<Coment[]> {
    return this.http.get<Coment[]>(`${this.host}comments`);
  }

  createComment(comment: Coment): Observable<Coment> {
    return this.http.post<Coment>(`${this.host}comments`, comment);
  }

  updateComment(id: string, comment: Coment): Observable<Coment> {
    return this.http.put<Coment>(`${this.host}comments/${id}`, comment);
  }

  deleteComment(id: string): Observable<Coment> {
    return this.http.delete<Coment>(`${this.host}comments/${id}`);
  }
}
