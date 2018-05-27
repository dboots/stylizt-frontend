import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from '../../../../services/client.service';
import { AuthService } from '../../../../services/auth.service';
import { Client } from '../../../../models/client.model';

@Component({
  selector: 'page-stylistclientsdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class StylistClientsDetailPage implements OnInit {    
  detailForm: FormGroup;
  detailFormErrors: any;
  clientId: string;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.clientId = params['id'];
      this.clientService.detail(this.clientId, this.authService.token).subscribe((result) => {
        console.log(result['data']);
      });
    });

    this.initForm();
  }

  initForm() {
    this.detailFormErrors = {
      name: {},
      zip: {}
    };

    this.detailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      zip: ['', Validators.required]
    });

    this.formValuesChanged();
    this.detailForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.detailFormErrors) {
      if (this.detailFormErrors.hasOwnProperty(field)) {
        this.detailFormErrors[field] = {};

        const control = this.detailForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.detailFormErrors[field] = control.errors;
        }
      }
    }
  }

  saveClient() {
    const name = this.detailForm.get('name').value;
    const zipcode = this.detailForm.get('zip').value;
    const body: Client = {
      name: this.detailForm.get('name').value,
      email: '',
      zip: this.detailForm.get('zip').value,
      image: '',
      owner: ''
    };
    this.clientService.update(this.clientId, body, this.authService.token).subscribe((result) => {
      console.log(result);
    }, (err) => {
      alert(err.error.messages[0]);
    });
  }
}
