import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Talent } from '../models';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class TalentService extends BaseService {
  itemList: Talent[];

  async read(): Promise<Talent[]> {
    const token = this.authService.token;
    if (this.itemList === undefined) {
      const result = await this.http
        .get(
          environment.rootApiUrl + '/talents',
          this.headers
        )
        .pipe(map((res: Talent[]) => res as Talent[]))
        .toPromise();
      this.itemList = result;
    }
    return new Promise<Talent[]>((resolve) => resolve(this.itemList));
  }

  create(body: Talent): Observable<Talent> {
    return this.http.post<Talent>(
      environment.rootApiUrl + '/talent',
      body,
      this.headers
    );
  }
}
