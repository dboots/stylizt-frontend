import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Service } from '../models';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class ServicesService extends BaseService {
  create(body: Service): Observable<Service> {
    return this.http.post<Service>(
      environment.rootApiUrl + '/stylist/service',
      body,
      this.headers
    );
  }

  read(ownerId: string): Observable<Service[]> {
    return this.http.get<Service[]>(environment.rootApiUrl + '/stylist/' + ownerId + '/services');
  }

  update(body: Service): Observable<Service> {
    return this.http.patch<Service>(
      environment.rootApiUrl + '/stylist/service/' + body._id,
      body,
      this.headers
    );
  }

  delete(body: Service): Observable<Service> {
    return this.http.delete<Service>(
      environment.rootApiUrl + '/stylist/service/' + body._id,
      this.headers
    );
  }
}
