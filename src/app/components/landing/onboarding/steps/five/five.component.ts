import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step-five',
  templateUrl: './five.component.html',
  styleUrls: ['./five.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class StepFiveComponent implements OnInit {
  constructor(private fgd: FormGroupDirective) {}
  ngOnInit() { }
}
