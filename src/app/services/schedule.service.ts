import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Schedule, Service } from '../models';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class ScheduleService {
  baseUrl: string = environment.rootApiUrl + '/stylist/schedule';
  httpHeaders: any;
  token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.httpHeaders = AuthService.httpOptions(this.authService.token);
    this.token = this.authService.token;
  }

  create(body: Schedule) {
    return this.http.post(this.baseUrl, body, this.httpHeaders);
  }

  read(date: string) {
    console.log('date', date);
    this.httpHeaders['params'] = { date };
    return this.http.get(this.baseUrl, this.httpHeaders);
  }

  update(body: Schedule) {
    return this.http.patch(this.baseUrl, body, this.httpHeaders);
  }

  delete() {
    return this.http.delete(this.baseUrl, this.httpHeaders);
  }
}
