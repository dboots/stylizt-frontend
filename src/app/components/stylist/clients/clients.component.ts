import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Client, User } from '../../../models';
import { AuthService, ClientService } from '../../../services';

@Component({
  selector: 'app-page-stylistclients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class StylistClientsPageComponent implements OnInit {
  modalRef: NgbModalRef;
  clientForm: FormGroup;
  clientName: FormControl;
  clients: any[];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.clientName = new FormControl('', [Validators.required]),

    this.clientForm = new FormGroup({
      clientName: this.clientName
    });

    try {
      this.clients = await this.clientService.read(this.authService.token);
    } catch (e) {
      console.log('exception', e);
    }
  }

  showAddClientModal(modal) {
    this.modalRef = this.modalService.open(modal);
  }

  showDetail(id) {
    this.router.navigate(['/stylist/clients/' + id]);
  }

  addClient() {
    const client: Client = new Client(this.clientName.value, '');
    this.clientService.create(client, this.authService.token).subscribe((result: any) => {
      this.modalRef.close();
      this.router.navigate(['/stylist/clients/' + result.data._id]);
    }, (err) => {
    });
  }
}
