import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Talent } from '../models';
import { AuthService } from './auth.service';

@Injectable()
export class TalentService {
  itemList: Talent[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async read(): Promise<any[]> {
    const token = this.authService.token;
    if (this.itemList === undefined) {
      const result = await this.http.get(environment.rootApiUrl + '/talents', AuthService.httpOptions(token))
        .map((res: any) => res['data'] as any[]).toPromise();
      this.itemList = result;
    }
    return new Promise<any[]>((resolve) => resolve(this.itemList));
  }

  readMockData() {
    return Observable.of([
      { id: 1, name: 'Bangs' },
      { id: 2, name: 'Frizz' },
      { id: 4, name: 'Blowouts' },
      { id: 6, name: 'Potatoe' },
      { id: 8, name: 'Apple' },
      { id: 9, name: 'Banana' },
      { id: 10, name: 'Tomatoe' },
      { id: 12, name: 'Potatoe' },
      { id: 15, name: 'Perm Talent 1' },
      { id: 20, name: 'Perm Talent 2' },
      { id: 50, name: 'Perm Talent 3' },
      { id: 61, name: 'Perm Talent 4' }
    ]).delay(300);
  }
}
