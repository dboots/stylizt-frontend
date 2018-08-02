import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ContactService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  contact(body: any) {
    return this.http.post(`${environment.rootApiUrl}/contact`, body);
  }
}
