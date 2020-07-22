
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Post } from '../models';

@Injectable()
export class PostService extends BaseService {
  cache: Map<any, any> = new Map();

  browse(params: any = {}, limit: number = 6): Observable<any> {
    // convert params to querystring
    let filter: string = '';
    Object.keys(params).map((key) => {
      filter += `${key}:${params[key]}`;
    });

    return this.getByCache<Post[]>(`${environment.rootApiUrl}/blog/browse?limit=${limit}&filter=${filter}`);
  }

  read(slug: string): Observable<any> {
    return this.getByCache<Post[]>(`${environment.rootApiUrl}/blog/read?slug=${slug}`);
  }
}
