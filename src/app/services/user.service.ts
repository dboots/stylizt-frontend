import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
  signup(body: User) {
    return this.http.post(environment.rootApiUrl + '/signup', body, AuthService.httpOptions());
  }

  search(query: string): Observable<User[]> {
    let httpParams = new HttpParams().set('query', query);
    return this.http.get<User[]>(environment.rootApiUrl + '/search', { params: httpParams });
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

  update(body: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.rootApiUrl + '/user/update', body, this.headers);
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
