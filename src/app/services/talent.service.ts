import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Talent } from '../models';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TalentService {
  itemList: Talent[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  async read(): Promise<any[]> {
    const token = this.authService.token;
    if (this.itemList === undefined) {
      const result = await this.http
        .get(
          environment.rootApiUrl + '/talents',
          AuthService.httpOptions(token)
        )
        .pipe(map((res: any) => res['data'] as any[]))
        .toPromise();
      this.itemList = result;
    }
    return new Promise<any[]>((resolve) => resolve(this.itemList));
  }

  create(body: Talent): Observable<Talent> {
    return this.http.post<Talent>(
      environment.rootApiUrl + '/talent',
      body,
      AuthService.httpOptions(this.authService.token)
    );
  }
}
