import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    get token(): string {
        return localStorage.getItem('token');
    }

    set token(val) {
        localStorage.setItem('token', val);
    }
    
    constructor(
        private jwt: JwtHelper
    ) {}
    
    public isAuthenticated(): boolean {
        if (this.token) {
            return !this.jwt.isTokenExpired(this.token);
        } else {
            return false;
        }
    }
    
    public decode() {
        return this.jwt.decodeToken(this.token).data;
    }
    
    public logout() {
        localStorage.removeItem('token');
    }
}