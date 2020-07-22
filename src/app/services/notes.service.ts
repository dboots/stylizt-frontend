import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Note } from '../models';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class NotesService {
  baseUrl: string = environment.rootApiUrl + '/stylist/client';

  constructor(private http: HttpClient, private authService: AuthService) { }

  create(body: Note): Observable<Note> {
    return this.http.post<Note>(this._getEndpoint(body.clientId), body, AuthService.httpOptions());
  }

  read(clientId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this._getEndpoint(clientId), AuthService.httpOptions());
  }

  update(body: Note) {
    return this.http.patch(this._getEndpoint(body.clientId), body, AuthService.httpOptions());
  }

  delete(clientId: string, noteId: string) {
    return this.http.delete(this._getEndpoint(clientId, noteId), AuthService.httpOptions());
  }

  _getEndpoint(clientId: string, noteId?: string) {
    let url = this.baseUrl + '/' + clientId + '/note';

    if (noteId) {
      url += '/' + noteId;
    }

    return url;
  }
}
