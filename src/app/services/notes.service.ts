import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Note } from '../models';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable()
export class NotesService extends BaseService {
  baseUrl: string = environment.rootApiUrl + '/stylist/client';

  create(body: Note): Observable<Note> {
    return this.http.post<Note>(this._getEndpoint(body.clientId), body, this.headers);
  }

  read(clientId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this._getEndpoint(clientId), this.headers);
  }

  update(body: Note) {
    return this.http.patch(this._getEndpoint(body.clientId), body, this.headers);
  }

  delete(clientId: string, noteId: string) {
    return this.http.delete(this._getEndpoint(clientId, noteId), this.headers);
  }

  _getEndpoint(clientId: string, noteId?: string) {
    let url = this.baseUrl + '/' + clientId + '/note';

    if (noteId) {
      url += '/' + noteId;
    }

    return url;
  }
}
