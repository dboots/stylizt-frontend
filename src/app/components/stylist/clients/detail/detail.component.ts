import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from '../../../../services/client.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'page-stylistclientsdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class StylistClientsDetailPage implements OnInit {    
  detailForm: FormGroup;
  fcName: FormControl;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fcName = new FormControl('', [Validators.required]),
    this.detailForm = new FormGroup({
      name: this.fcName
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      let clientId = params['id'];
      this.clientService.detail(clientId, this.authService.token).subscribe((result) => {
        console.log(result['data']);
      });
    });
  }
  
  saveClient() {
    console.log('saving client');
  }
}