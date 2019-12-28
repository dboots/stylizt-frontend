import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  signup(body: User) {
    return this.http.post(environment.rootApiUrl + '/signup', body, AuthService.httpOptions());
  }

  search(query: string) {
    let httpParams = new HttpParams().set('query', query);
    return this.http.get(environment.rootApiUrl + '/search', { params: httpParams });
  }

  login(body) {
    return this.http.post(environment.rootApiUrl + '/login', body, AuthService.httpOptions());
  }

  read(params) {
    return this.http.get(`${environment.rootApiUrl}/stylists`, { params });
  }

  createSubscription(token: string, sourceToken: string) {
    let body = {
      sourceToken
    };

    return this.http.post(`${environment.rootApiUrl}/user/subscribe`, body, AuthService.httpOptions(token));
  }

  update(body: User) {
    let token = this.authService.token;
    body.url = (body.url) ? body.url.toLowerCase().replace(' ', '').trim() : null;
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
