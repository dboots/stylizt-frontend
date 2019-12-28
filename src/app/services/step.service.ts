import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class StepService {
  stepSubject: Subject<any> = new Subject();
  nextActions: Array<() => Promise<any>> = [];

  get user() {
    return this.authService.decode();
  }

  constructor(private authService: AuthService) { }

}
