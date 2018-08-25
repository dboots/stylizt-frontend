import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  signup(body: User) {
    return this.http.post(environment.rootApiUrl + '/signup', body, AuthService.httpOptions());
  }

  login(body) {
    return this.http.post(environment.rootApiUrl + '/login', body, AuthService.httpOptions());
  }

  read(params) {
    return this.http.get(`${environment.rootApiUrl}/stylists`, {params: params});
  }

  update(token: string, body: User) {
    return this.http.post(environment.rootApiUrl + '/user/update', body, AuthService.httpOptions(token));
  }

  setPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password', body, AuthService.httpOptions());
  }

  resetPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password/reset', body, AuthService.httpOptions());
  }

  forgotPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password/forgot', body, AuthService.httpOptions());
  }
}
