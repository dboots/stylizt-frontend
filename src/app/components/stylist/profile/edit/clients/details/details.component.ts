import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from 'src/app/services';
import { Client, Portfolio } from 'src/app/models';

@Component({
  selector: 'app-profile-clients-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class EditProfileClientsDetailsComponent implements OnInit {
  @Input() client: Client;
  @Output() isAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() clientChange: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(public clientService: ClientService) { }

  async ngOnInit() {
  }

  delete(client: Client) {
    this.clientService.delete(client._id).subscribe((result) => {
      this.clientService.clients = this.clientService.clients.filter(c => c._id !== client._id);
    });
  }

  save() {
    const client = this.client;
    if (client._id) {
      this.clientService.update(client._id, client).subscribe((result) => {
        console.log('details updated', result);
        this.isAdded.emit({ client: result, updated: true });
      });
    } else {
      this.clientService.create(this.client).subscribe((result) => {
        console.log('details updated', result);
        this.isAdded.emit({ client: result, updated: false });
      });
    }
  }

  imageUploadCompleted($event) {
    const client = this.client;
    let url = $event.url;
    let portfolio = new Portfolio(url);
    portfolio.clientId = client._id;
    portfolio.publicId = $event.public_id;

    client.portfolio.push(portfolio);
    this.clientService.update(client._id, client).subscribe((result) => {
      console.log('client updated', result);
    });
  }

  cancel() {
    this.clientChange.emit(null);
  }
}
