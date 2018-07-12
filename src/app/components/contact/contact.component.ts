import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactPageComponent implements OnInit {
  formSubmitted: boolean;

  constructor() { }

  ngOnInit() {
  }

  submit(event) {
    this.formSubmitted = true;
  }
}
