import { Injectable, InjectionToken, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {
  jwt = new JwtHelperService();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  get token(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
  }

  set token(val) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', val);
    }
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
