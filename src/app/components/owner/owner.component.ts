import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../shared/signup/signup.component';

@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
    imports: [SignupComponent],
    standalone: true
})
export class OwnerPageComponent implements OnInit {
  plan: number;

  constructor() { }

  ngOnInit() {

  }
}
