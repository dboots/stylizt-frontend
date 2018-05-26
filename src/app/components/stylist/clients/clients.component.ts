import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'page-stylistclients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class StylistClientsPage implements OnInit {
  modalRef: NgbModalRef;
  clientForm: FormGroup;
  clientName: FormControl;
  clients: Array<Client>;
  
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.clientName = new FormControl('', [Validators.required]),
    
    this.clientForm = new FormGroup({
      clientName: this.clientName
    });

    this.clientService.read(this.authService.token).subscribe((result) => {
      this.clients = result['data'] as Array<Client>;
    }, (err) => {
      console.log(err);
    });
  }
  
  showAddClientModal(modal) {
    this.modalRef = this.modalService.open(modal);
  }
  
  showDetail(id) {
    this.router.navigate(['/stylist/clients/' + id]);
  }

  addClient() {
    let user: User = this.authService.decode();
    let client: Client = new Client(this.clientName.value, '', user._id);
    this.clientService.create(client, this.authService.token).subscribe((result: any) => {
      this.modalRef.close();
      this.router.navigate(['/stylist/clients/' + result.data._id]);
    }, (err) => {
    });
  }
}