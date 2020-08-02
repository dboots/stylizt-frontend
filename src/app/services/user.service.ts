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
    return this.http.post(environment.rootApiUrl + '/signup', body, this.headers);
  }

  search(query: string): Observable<User[]> {
    let httpParams = new HttpParams().set('query', query);
    return this.http.get<User[]>(environment.rootApiUrl + '/search', { params: httpParams });
  }

  login(body): Observable<User> {
    return this.http.post<User>(environment.rootApiUrl + '/login', body, this.headers);
  }

  read(params): Observable<User[]> {
    return this.http.get<User[]>(`${environment.rootApiUrl}/stylists`, { params });
  }

  createSubscription(sourceToken: string) {
    let body = {
      sourceToken
    };

    return this.http.post(`${environment.rootApiUrl}/user/subscribe`, body, this.headers);
  }

  update(body: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.rootApiUrl + '/user/update', body, this.headers);
  }

  setPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password', body, this.headers);
  }

  resetPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password/reset', body, this.headers);
  }

  forgotPassword(body) {
    return this.http.post(environment.rootApiUrl + '/password/forgot', body, this.headers);
  }
}
