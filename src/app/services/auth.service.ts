import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = 'http://localhost:3000/';
  private loggedAdminInStatus = false;
  private loggedUserInStatus = false;

  constructor(
    private http: HttpClient
  ) { }

  setAdminLoggedIn(value: boolean) {
    this.loggedAdminInStatus = value;
  }
  setUserLoggedIn(value: boolean) {
    this.loggedUserInStatus = value;
  }

  get isLoggedAdminIn() {
    return this.loggedAdminInStatus;
  }
  get isLoggedUserIn() {
    return this.loggedUserInStatus;
  }

  login(obj: User): Observable<User> {
    return this.http.post<User>(`${this.host}login`, obj);
  }

  signinReq(): Observable<User> {
    return this.http.get<User>( `${this.host}sign`);
  }

  logout(): Observable<any> {
    return this.http.get( `${this.host}logout`);
  }

  register(obj: User): Observable<User> {
    console.log(obj);
    return this.http.post<User>(`${this.host}register`, obj);
  }
}
