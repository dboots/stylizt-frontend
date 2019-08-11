import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Service } from '../models';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  create(body: Service): Observable<Service> {
    return this.http.post<Service>(
      environment.rootApiUrl + '/stylist/service',
      body,
      AuthService.httpOptions(this.authService.token)
    );
  }

  read(ownerId: string): Observable<Service[]> {
    return this.http.get<Service[]>(environment.rootApiUrl + '/stylist/' + ownerId + '/services');
  }

  update(body: Service): Observable<Service> {
    return this.http.patch<Service>(
      environment.rootApiUrl + '/stylist/service/' + body._id,
      body,
      AuthService.httpOptions(this.authService.token)
    );
  }

  delete(body: Service): Observable<Service> {
    return this.http.delete<Service>(
      environment.rootApiUrl + '/stylist/service/' + body._id,
      AuthService.httpOptions(this.authService.token)
    );
  }
}
