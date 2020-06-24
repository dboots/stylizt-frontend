import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Portfolio } from '../models';

@Injectable()
export class PortfolioService {
  constructor(
    private http: HttpClient
  ) { }

  create(body, token: string): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${environment.rootApiUrl}/stylist/portfolio`, body, AuthService.httpOptions(token));
  }

  read(params: any = {}): Observable<any> {
    console.log('getting params');
    return this.http.get<any>(`${environment.rootApiUrl}/portfolio`, { params });
  }

  search(params) {
    return this.http.get(`${environment.rootApiUrl}/search/portfolio`, { params });
  }

  update(body, token: string) {
    return this.http.patch(`${environment.rootApiUrl}/stylist/portfolio/${body._id}`, body, AuthService.httpOptions(token));
  }

  delete(portfolioId: string, token: string) {
    return this.http.delete(`${environment.rootApiUrl}/stylist/portfolio/${portfolioId}`, AuthService.httpOptions(token));
  }
}
