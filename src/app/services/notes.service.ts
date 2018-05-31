import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Notes } from '../models';
import { AuthService } from './auth.service';

@Injectable()
export class NotesService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  create(clientId: string, body: Notes, token: string) {
    return this.http.post(`${environment.rootApiUrl}/stylist/clients/${clientId}/notes`, body, AuthService.httpOptions(token));
  }

  read(clientId: string, token: string) {
    return this.http.get(`${environment.rootApiUrl}/stylist/clients/${clientId}/notes`, AuthService.httpOptions(token));
  }

  update(clientId: string, notesId: string, body: Notes, token: string) {
    return this.http.patch(`${environment.rootApiUrl}/stylist/clients/${clientId}/notes/${notesId}`, body, AuthService.httpOptions(token));
  }

  detail(clientId: string, notesId: string, token: string) {
    return this.http.get(`${environment.rootApiUrl}/stylist/clients/${clientId}/notes/${notesId}`, AuthService.httpOptions(token));
  }

  delete(clientId: string, notesId: string, token: string) {
    return this.http.delete(`${environment.rootApiUrl}/stylist/clients/${clientId}/notes/${notesId}`, AuthService.httpOptions(token));
  }
}
