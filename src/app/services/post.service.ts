
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class PostService extends BaseService {
  cache: Map<any, any> = new Map();

  constructor(http: HttpClient) {
    super(http);
  }

  browse(params: any = {}, limit: number = 6): Observable<any> {
    // convert params to querystring
    let filter: string = '';
    Object.keys(params).map((key) => {
      filter += `${key}:${params[key]}`;
    });

    return this.getByCache(`${environment.rootApiUrl}/blog/browse?limit=${limit}&filter=${filter}`);
  }

  read(slug: string): Observable<any> {
    return this.getByCache(`${environment.rootApiUrl}/blog/read?slug=${slug}`);
  }
}
