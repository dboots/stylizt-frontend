import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http:HttpClient) { }

  signup(body: User) {
    return this.http.post(environment.rootApiUrl + '/signup', body, httpOptions);
  }

  login(body) {
    return this.http.post(environment.rootApiUrl + '/login', body, httpOptions);
  }

  update(token: string, body: User) {
    return this.http.post(environment.rootApiUrl + '/update', body, httpOptions)
  }

  setPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password', body, httpOptions)
  }

  resetPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password/reset', body, httpOptions);
  }

  forgotPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password/forgot', body, httpOptions);
  }
}
