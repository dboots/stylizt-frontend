import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtHelper
    ) {}
    
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwt.isTokenExpired(token);
    }

    public decode(token) {
        return this.jwt.decodeToken(token);
    }
}