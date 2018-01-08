import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SignupService {

  constructor(private http:HttpClient) { }

  signup(body) {
    return this.http.post('http://stylizt-backend.herokuapp.com/api/signup', body, httpOptions);
  }
}
