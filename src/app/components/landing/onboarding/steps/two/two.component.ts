import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class StepTwoComponent implements OnInit {
  constructor(private fgd: FormGroupDirective) {}
  ngOnInit() { }
}
