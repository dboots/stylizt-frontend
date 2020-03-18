
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  browse(): Observable<any> {
    return this.http.get<any>(`${environment.rootApiUrl}/blog/browse`);
  }

  read(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.rootApiUrl}/blog/read?slug=${slug}`);
  }
}
