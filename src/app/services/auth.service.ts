import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtHelper
    ) {}
    
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return !this.jwt.isTokenExpired(token);
        } else {
            return false;
        }
    }
    
    public decode(token) {
        return this.jwt.decodeToken(token);
    }
    
    public logout() {
        localStorage.removeItem('token');
    }
}