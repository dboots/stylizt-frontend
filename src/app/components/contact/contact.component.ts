import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;
  contactFormErrors: any;
  formSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactFormErrors = {
      name: {},
      email: {},
      thoughts: {}
    };

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      thoughts: ['', Validators.required]
    });

    this.formValuesChanged();
    this.contactForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.contactFormErrors) {
      if (this.contactFormErrors.hasOwnProperty(field)) {
        this.contactFormErrors[field] = {};

        const control = this.contactForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.contactFormErrors[field] = control.errors;
        }
      }
    }
  }

  submit(event) {
    this.formSubmitted = true;
  }
}
