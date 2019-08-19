import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Schedule } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class ScheduleService {
  baseUrl: string = environment.rootApiUrl + '/stylist/schedule';
  httpHeaders: HttpHeaders = new HttpHeaders();
  token: string;

  constructor(
    private http: HttpClient
  ) {
    this.httpHeaders.set('Content-Type', 'application/json').set('Accept', 'application/json');
  }

  create(body: Schedule) {
    return this.http.post(this.baseUrl, body);
  }

  read(owner: string, timestamp: number): Observable<Schedule[]> {
    let httpParams = new HttpParams().set('owner', owner).set('date', timestamp.toString());
    return this.http.get<Schedule[]>(this.baseUrl, {
      headers: this.httpHeaders,
      params: httpParams
    });
  }
}
