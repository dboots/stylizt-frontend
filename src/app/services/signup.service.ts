import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Signup } from '../models/signup.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SignupService {

  constructor(private http:HttpClient) { }

  signup(body: Signup) {
    return this.http.post(environment.rootApiUrl + '/signup', body, httpOptions);
  }

  login(body) {
    return this.http.post(environment.rootApiUrl + '/login', body, httpOptions);
  }
}
