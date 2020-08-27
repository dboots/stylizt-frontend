import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class ClientService extends BaseService {
  public clients: Client[];

  create(body: Client): Observable<Client> {
    return this.http.post<Client>(environment.rootApiUrl + '/stylist/clients', body, this.headers);
  }

  async read(): Promise<Client[]> {
    if (this.clients === undefined) {
      const result = await this.http.get<Client[]>(environment.rootApiUrl + '/stylist/clients', this.headers).pipe(
        map((res) => res)).toPromise();
      this.clients = result;
    }

    return new Promise<Client[]>((resolve) => resolve(this.clients));
  }

  update(id: string, body: Client): Observable<Client> {
    return this.http.patch<Client>(environment.rootApiUrl + '/stylist/clients/' + id, body, this.headers);
  }

  detail(id: string): Observable<Client> {
    return this.http.get<Client>(environment.rootApiUrl + '/stylist/clients/' + id, this.headers);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.rootApiUrl + '/stylist/clients/' + id, this.headers);
  }
}
