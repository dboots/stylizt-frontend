import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from 'src/app/services';
import { Client } from 'src/app/models';

@Component({
  selector: 'app-profile-clients-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class EditProfileClientsDetailsComponent implements OnInit {
  @Input() client: Client;
  @Output() isAdded: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(public clientService: ClientService) { }

  async ngOnInit() {
  }

  delete(client: Client) {
    this.clientService.delete(client._id).subscribe((result) => {
      this.clientService.clients = this.clientService.clients.filter(c => c._id !== client._id);
    });
  }

  save() {
    this.clientService.create(this.client).subscribe((result) => console.log(result));
  }

  cancel() {
    this.isAdded.emit(this.client);
  }
}
