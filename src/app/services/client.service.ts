
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

@Injectable()
export class ClientService {
  public clients: Client[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  create(body: Client): Observable<Client> {
    return this.http.post<Client>(environment.rootApiUrl + '/stylist/clients', body, AuthService.httpOptions());
  }

  async read(): Promise<Client[]> {
    if (this.clients === undefined) {
      const result = await this.http.get<Client[]>(environment.rootApiUrl + '/stylist/clients', AuthService.httpOptions()).pipe(
        map((res) => res)).toPromise();
      this.clients = result;
    }

    return new Promise<Client[]>((resolve) => resolve(this.clients));
  }

  update(id: string, body: Client) {
    return this.http.patch(environment.rootApiUrl + '/stylist/clients/' + id, body, AuthService.httpOptions());
  }

  detail(id: string) {
    return this.http.get(environment.rootApiUrl + '/stylist/clients/' + id, AuthService.httpOptions());
  }

  delete(id: string) {
    return this.http.delete(environment.rootApiUrl + '/stylist/clients/' + id, AuthService.httpOptions());
  }
}
