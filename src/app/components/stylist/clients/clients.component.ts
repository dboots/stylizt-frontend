import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl } from '@angular/forms';
import { Client, User } from '../../../models';
import { ClientService } from '../../../services';

@Component({
  selector: 'app-page-stylistclients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class StylistClientsPageComponent implements OnInit {
  modalRef: NgbModalRef;
  clientForm: UntypedFormGroup;
  clientName: UntypedFormControl;
  clients: any[];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private clientService: ClientService
  ) {}

  async ngOnInit() {
    this.clientName = new UntypedFormControl('', [Validators.required]),

    this.clientForm = new UntypedFormGroup({
      clientName: this.clientName
    });

    try {
      this.clients = await this.clientService.read();
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
    this.clientService.create(client).subscribe((result: any) => {
      this.clientService.clients.push(result);
      this.modalRef.close();
      this.router.navigate(['/stylist/clients/' + result._id]);
    }, (err) => {
    });
  }
}
