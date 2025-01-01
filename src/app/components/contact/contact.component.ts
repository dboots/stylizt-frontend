import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactForm: UntypedFormGroup;
  contactFormErrors: any;
  formSubmitted: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private contactService: ContactService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.seoService.createCanonicalUrl();
    this.seoService.updateMetaTags('Contact - Hair To Chair', null, 'To get in contact with Hair To Chair please complete our online contact form. We look forward to hearing from you.');
    this.initForm();
  }

  initForm() {
    this.contactFormErrors = {
      name: {},
      email: {},
      message: {}
    };

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
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
    let formControls = this.contactForm.controls;
    let body = {
      name: formControls.name.value,
      email: formControls.email.value,
      message: formControls.message.value
    };

    this.contactService.contact(body).subscribe((result) => {
      this.formSubmitted = true;
    });
  }
}
