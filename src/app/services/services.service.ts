import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Service } from '../models';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  read(): Observable<Service[]> {
    const token = this.authService.token;
    return this.http.get<Service[]>(
      environment.rootApiUrl + '/talents',
      AuthService.httpOptions(token)
    );
  }

  create(body: Service): Observable<Service> {
    return this.http.post<Service>(
      environment.rootApiUrl + '/talent',
      body,
      AuthService.httpOptions(this.authService.token)
    );
  }
}
