import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';

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
    
    static httpOptions(token?: string) {
        let headers = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['authorization'] = 'Bearer ' + token;
        }
        
        return { headers: new HttpHeaders(headers) }
    }
    
    public isAuthenticated(): boolean {
        if (this.token) {
            return !this.jwt.isTokenExpired(this.token);
        } else {
            return false;
        }
    }
    
    public decode(): User {
        return this.jwt.decodeToken(this.token).data as User;
    }
    
    public logout() {
        localStorage.removeItem('token');
    }
}