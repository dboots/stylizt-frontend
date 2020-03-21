import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class BaseService {
  cache: Map<string, any> = new Map();

  constructor(private http: HttpClient) { }

  getByCache(url: string) {
    let cache = this.cache.get(url);
    let response: Observable<any>;

    if (cache) {
      return of({ data: cache });
    }

    response = this.http.get<any>(url);
    response.subscribe((result) => {
      this.cache.set(url, result.data);
    });

    return response;
  }
}
