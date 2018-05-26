import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-stylistclientsdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class StylistClientsDetailPage implements OnInit {    
  detailForm: FormGroup;
  fcName: FormControl;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.fcName = new FormControl('', [Validators.required]),
    this.detailForm = new FormGroup({
      name: this.fcName
    });
  }
  
  saveClient() {
    console.log('saving client');
  }
}