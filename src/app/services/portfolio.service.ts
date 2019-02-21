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
    
    create(body, token: string) {
      return this.http.post(`${environment.rootApiUrl}/stylist/portfolio`, body, AuthService.httpOptions(token));
    }
    
    read(params) {
      return this.http.get(`${environment.rootApiUrl}/portfolio`, { params: params });
    }
    
    search(params) {
      return this.http.get(`${environment.rootApiUrl}/search/portfolio`, { params: params });
    }
    
    update(body, token: string) {
      return this.http.patch(`${environment.rootApiUrl}/stylist/portfolio/${body._id}`, body, AuthService.httpOptions(token));
    }
    
    delete(portfolioId: string, token: string) {
      return this.http.delete(`${environment.rootApiUrl}/stylist/portfolio/${portfolioId}`, AuthService.httpOptions(token));
    }
  }
  