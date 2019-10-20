import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class StepThreeComponent implements OnInit {
  constructor(private fgd: FormGroupDirective) {}
  ngOnInit() { }
}
