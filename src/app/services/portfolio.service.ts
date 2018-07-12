import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Portfolio } from '../models';
import { AuthService } from './auth.service';

@Injectable()
export class PortfolioService {
  constructor(
    private http: HttpClient
  ) { }

  create(body: Portfolio, token: string) {
    return this.http.post(`${environment.rootApiUrl}/stylist/portfolio`, body, AuthService.httpOptions(token));
  }

  read(clientId: string, token: string) {
    return this.http.get(`${environment.rootApiUrl}/stylist/clients/${clientId}/portfolio`, AuthService.httpOptions(token));
  }

  update(clientId: string, portfolioId: string, body: Portfolio, token: string) {
    return this.http.patch(`${environment.rootApiUrl}/stylist/clients/${clientId}/portfolio/${portfolioId}`, body, AuthService.httpOptions(token));
  }

  detail(clientId: string, portfolioId: string, token: string) {
    return this.http.get(`${environment.rootApiUrl}/stylist/clients/${clientId}/portfolio/${portfolioId}`, AuthService.httpOptions(token));
  }

  delete(clientId: string, portfolioId: string, token: string) {
    return this.http.delete(`${environment.rootApiUrl}/stylist/clients/${clientId}/portfolio/${portfolioId}`, AuthService.httpOptions(token));
  }
}
