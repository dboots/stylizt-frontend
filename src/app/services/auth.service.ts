import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    constructor() {
    }
    
    public isAuthenticated(): boolean {
        let jwtHelper = new JwtHelperService();
        const token = localStorage.getItem('token');
        console.log(jwtHelper.isTokenExpired(token));
        return !jwtHelper.isTokenExpired(token);
    }
}