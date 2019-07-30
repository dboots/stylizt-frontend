import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Note } from '../models';
import { AuthService } from './auth.service';

@Injectable()
export class NotesService {
  baseUrl: string = environment.rootApiUrl + '/stylist/client';
  httpHeaders: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.httpHeaders = AuthService.httpOptions(this.authService.token);
  }

  create(body: Note) {
    return this.http.post(this._getEndpoint(body.clientId), body, this.httpHeaders);
  }

  read(clientId: string) {
    return this.http.get(this._getEndpoint(clientId), this.httpHeaders);
  }

  update(body: Note) {
    return this.http.patch(this._getEndpoint(body.clientId), body, this.httpHeaders);
  }

  delete(clientId: string, noteId: string) {
    return this.http.delete(this._getEndpoint(clientId, noteId), this.httpHeaders);
  }

  _getEndpoint(clientId: string, noteId?: string) {
    let url = this.baseUrl + '/' + clientId + '/note';

    if (noteId) {
      url += '/' + noteId;
    }

    return url;
  }
}
