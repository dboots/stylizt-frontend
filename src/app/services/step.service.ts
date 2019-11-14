import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class StepService {
  stepSubject: Subject<any> = new Subject();
  nextActions: Array<() => Promise<any>> = [];
}
