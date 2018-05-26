import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { AuthService } from './auth.service';

@Injectable()
export class ClientService {
  constructor(
    private http:HttpClient
  ) { }
  
  create(body: Client, token: string) {
    return this.http.post(environment.rootApiUrl + '/stylist/clients/create', body, AuthService.httpOptions(token));
  }
  
  read(token: string) {
    return this.http.get(environment.rootApiUrl + '/stylist/clients', AuthService.httpOptions(token));
  }

  update(id: string, body: Client, token: string) {
    return this.http.patch(environment.rootApiUrl + '/stylist/clients/' + id, body, AuthService.httpOptions(token));
  }

  detail(id: string, token: string) {
    return this.http.get(environment.rootApiUrl + '/stylist/clients/' + id, AuthService.httpOptions(token));
  }
}