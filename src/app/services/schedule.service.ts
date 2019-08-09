import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Schedule } from '../models';

@Injectable()
export class ScheduleService {
  baseUrl: string = environment.rootApiUrl + '/stylist/schedule';
  httpHeaders: any = {};
  token: string;

  constructor(
    private http: HttpClient
  ) { }

  create(body: Schedule) {
    return this.http.post(this.baseUrl, body);
  }

  read(owner: string, timestamp: number) {
    this.httpHeaders['params'] = { owner, date: timestamp };
    return this.http.get(this.baseUrl, this.httpHeaders);
  }
}
