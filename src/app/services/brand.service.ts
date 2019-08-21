import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Brand } from '../models';
import { AuthService } from './auth.service';

@Injectable()
export class BrandService {
  itemList: Brand[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  async read(): Promise<any[]> {
    const token = this.authService.token;
    if (this.itemList === undefined) {
      const result = await this.http
        .get(
          environment.rootApiUrl + '/brands',
          AuthService.httpOptions(token)
        )
        .pipe(map((res: any) => res['data'] as any[]))
        .toPromise();
      this.itemList = result;
    }
    return new Promise<any[]>((resolve) => resolve(this.itemList));
  }

  create(body: Brand) {
    return this.http.post(
      environment.rootApiUrl + '/brand',
      body,
      AuthService.httpOptions(this.authService.token)
    );
  }
}
