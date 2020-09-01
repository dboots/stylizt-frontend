import { Component, OnInit } from '@angular/core';
import { User, Client } from '../../../../../models';
import { ClientService } from 'src/app/services';

@Component({
  selector: 'app-profile-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
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

  clientAdded($event: any) {
    const client = $event.client;
    const clients = this.clientService.clients;

    const idx = clients.findIndex(c => c._id === $event.client._id);

    if (idx !== -1) {
      console.log('updating', idx);
      clients[idx] = client;
    } else {
      console.log('adding', idx);
      clients.push(client);
    }

    this.clientService.clients = clients;
    this.client = null;
  }

  delete(client: Client) {
    this.clientService.delete(client._id).subscribe((result) => {
      this.clientService.clients = this.clientService.clients.filter(c => c._id !== client._id);
    });
  }
}
