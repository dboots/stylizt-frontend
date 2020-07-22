import { Component, OnInit } from '@angular/core';
import { User, Client } from '../../../../../models';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { ClientService } from 'src/app/services';

@Component({
  selector: 'app-profile-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class EditProfileClientsComponent implements OnInit {
  user: User;
  clients: Client[];
  constructor(private clientService: ClientService) { }

  async ngOnInit() {
    this.clients = await this.clientService.read();
  }
}
