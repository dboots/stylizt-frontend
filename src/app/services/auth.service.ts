import { Injectable, InjectionToken, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {
  jwt = new JwtHelperService();

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

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

  static httpOptions(token?: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
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
      return this.jwt.decodeToken(this.token).payload as User;
    }
  }

  public logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
