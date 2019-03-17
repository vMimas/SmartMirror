import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  Token : any
  User : any

  constructor(private http: HttpClient){

  }
  register(body : any){
    return this.http.post<any>('http://127.0.0.1:3000/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  login(body : any){
    return this.http.post<any>('http://127.0.0.1:3000/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  logout(){
    this.Token = null;
    this.User = null;
    localStorage.clear();
    return this.http.get('http://127.0.0.1:3000/logout', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
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
    return this.http.get<any>('http://127.0.0.1:3000/dashboard', httpOptions);
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    console.log(token);
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
}
