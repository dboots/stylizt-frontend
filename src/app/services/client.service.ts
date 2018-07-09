import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { AuthService } from './auth.service';

@Injectable()
export class ClientService {
  clients: any[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  create(body: Client, token: string) {
    return this.http.post(environment.rootApiUrl + '/stylist/clients', body, AuthService.httpOptions(token));
  }

  async read(token: string): Promise<any[]> {
    if (this.clients === undefined) {
      const result = await this.http.get(environment.rootApiUrl + '/stylist/clients', AuthService.httpOptions(token))
        .map((res: any) => res['data'] as any[]).toPromise();
      this.clients = result;
    }
    return new Promise<any[]>((resolve) => resolve(this.clients));
  }

  update(id: string, body: Client, token: string) {
    return this.http.patch(environment.rootApiUrl + '/stylist/clients/' + id, body, AuthService.httpOptions(token));
  }

  detail(id: string, token: string) {
    return this.http.get(environment.rootApiUrl + '/stylist/clients/' + id, AuthService.httpOptions(token));
  }
}
