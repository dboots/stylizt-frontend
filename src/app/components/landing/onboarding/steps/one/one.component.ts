import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class StepOneComponent implements OnInit {
  constructor(private fgd: FormGroupDirective) {}
  ngOnInit() { }
}
