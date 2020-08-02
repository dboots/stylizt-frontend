import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Brand } from '../models';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class BrandService extends BaseService {
  itemList: Brand[];

  async read(): Promise<Brand[]> {
    if (this.itemList === undefined) {
      const result = await this.http
        .get<Brand[]>(
          environment.rootApiUrl + '/brands',
          this.headers
        )
        .pipe(map((res: Brand[]) => res as Brand[]))
        .toPromise();
      this.itemList = result;
    }
    return new Promise<Brand[]>((resolve) => resolve(this.itemList));
  }

  create(body: Brand): Observable<Brand> {
    return this.http.post<Brand>(
      environment.rootApiUrl + '/brand',
      body,
      this.headers
    );
  }
}
