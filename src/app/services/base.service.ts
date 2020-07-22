import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class BaseService {
  cache: Map<string, any> = new Map();
  headers: { headers: HttpHeaders };

  constructor(public http: HttpClient, public authService: AuthService) {
    this.headers = AuthService.httpOptions(this.authService.token);
  }

  getByCache<T>(url: string): Observable<T[]> {
    let cache = this.cache.get(url);
    let response: Subject<T[]> = new Subject<T[]>();

    if (cache) {
      return of(cache);
    }

    this.http.get<T[]>(url).subscribe((result) => {
      this.cache.set(url, result);
      response.next(result);
    });

    return response.asObservable();
  }
}
