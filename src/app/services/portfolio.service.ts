import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Portfolio } from '../models';
import { BaseService } from './base.service';
import { Site } from '../models/site';

@Injectable()
export class PortfolioService extends BaseService {
  create(body: any): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${environment.rootApiUrl}/stylist/portfolio`, body, this.headers);
  }

  read(params: any = {}): Observable<Site> {
    return this.http.get<Site>(`${environment.rootApiUrl}/portfolio`, { params });
  }

  search(params): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${environment.rootApiUrl}/search/portfolio`, { params });
  }

  update(body): Observable<Portfolio> {
    return this.http.patch<Portfolio>(`${environment.rootApiUrl}/stylist/portfolio/${body._id}`, body, this.headers);
  }

  delete(portfolioId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.rootApiUrl}/stylist/portfolio/${portfolioId}`, this.headers);
  }
}
