import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  jwt = new JwtHelperService();
  get token(): string {
    return localStorage.getItem('token');
  }

  set token(val) {
    localStorage.setItem('token', val);
  }

  static httpOptions(token?: string) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['authorization'] = 'Bearer ' + token;
    }

    return { headers: new HttpHeaders(headers) };
  }

  public isAuthenticated(): boolean {
    if (this.token) {
      return !this.jwt.isTokenExpired(this.token);
    } else {
      return false;
    }
  }

  public decode(): User {
    if (this.token) {
      return this.jwt.decodeToken(this.token).data as User;
    }
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
