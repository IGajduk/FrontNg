import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private host = 'http://localhost:3000/';
  private loggedInStatus = false;

  constructor(
    private http: HttpClient
  ) {
}


getUserById(id: string): Observable<User> {
  return this.http.get<User>(`${this.host}users/${id}`);
}

getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.host}users`);
}

createUser(user: User): Observable<User> {
  return this.http.post<User>(`${this.host}users`, user);
}

updateUser(id: string, user: User): Observable<User> {
  return this.http.put<User>(`${this.host}users/${id}`, user);
}

deleteUser(id: string): Observable<User> {
  return this.http.delete<User>(`${this.host}users/${id}`);
}



}
