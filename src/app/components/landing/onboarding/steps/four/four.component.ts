import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class StepFourComponent implements OnInit {
  constructor(private fgd: FormGroupDirective) {}
  ngOnInit() { }
}
