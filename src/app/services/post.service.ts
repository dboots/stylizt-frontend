
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

  browse(): Observable<any> {
    return this.getByCache(`${environment.rootApiUrl}/blog/browse`);
  }

  read(slug: string): Observable<any> {
    return this.getByCache(`${environment.rootApiUrl}/blog/read?slug=${slug}`);
  }
}
