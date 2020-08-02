import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/app/services';
import { Client } from 'src/app/models';

@Component({
  selector: 'app-profile-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EditProfileClientsListComponent implements OnInit {
  @Output() selectClient: EventEmitter<Client> = new EventEmitter<Client>();
  constructor(public clientService: ClientService) { }

  async ngOnInit() {
    await this.clientService.read();
  }

  select(client: Client) {
    this.selectClient.emit(client);
  }

  delete(client: Client) {
    this.clientService.delete(client._id).subscribe((result) => {
      this.clientService.clients = this.clientService.clients.filter(c => c._id !== client._id);
    });
  }
}
