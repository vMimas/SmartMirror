import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import * as moment from 'moment';

// const appUrl = 'http://127.0.0.1:3000/'
  const appUrl = '/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Token : any
  public User : any

  constructor(private http: HttpClient){ }

  register(body : any){
    return this.http.post<any>(appUrl + 'register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body : any){
    return this.http.post<any>(appUrl + 'login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout(){
    this.Token = null;
    this.User = null;
    localStorage.clear();
    return this.http.get(appUrl);
  }

  storeUserData(token, user, expiresIn){
    const expiresAt = moment().add(expiresIn,'second');
    localStorage.setItem('id_token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(user));

    this.Token = token;
    this.User = user;
  }

  getDashboard(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.Token
      })
    };
    return this.http.get<any>(appUrl + 'dashboard', httpOptions);
  }

  getSettings(){
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.Token
      })
    };
    return this.http.get<any>(appUrl + 'settings', httpOptions);
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.Token = token;
  }

  isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  //getUser object from localStorage
  getUser(){
    return JSON.parse(localStorage["user"]);
  }

  updateUser(user: User) : Observable<any>{
    this.loadToken();

    //update localstorage with new user information
    localStorage.setItem('user', JSON.stringify(user));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.Token
      })
    };

    //send updated user to backend
    return this.http.put(appUrl + 'user/' + user.id, user, httpOptions);
  }

  deleteUser() {
    const id = this.getUser().id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.Token
      })
    };

    return this.http.delete<any>(appUrl + 'user/' + id, httpOptions);
  }

}
