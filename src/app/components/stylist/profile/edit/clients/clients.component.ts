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
  client: Client;
  constructor(public clientService: ClientService) { }

  async ngOnInit() {
    await this.clientService.read();
  }

  add() {
    this.client = new Client('', '');
  }

  selectClient(client: Client) {
    this.client = client;
  }

  clientAdded(client: Client) {
    console.log(client);
    this.clientService.clients.push(client);
    this.client = null;
  }

  delete(client: Client) {
    this.clientService.delete(client._id).subscribe((result) => {
      this.clientService.clients = this.clientService.clients.filter(c => c._id !== client._id);
    });
  }
}
