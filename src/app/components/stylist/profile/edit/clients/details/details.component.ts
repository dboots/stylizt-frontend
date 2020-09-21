import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService, ClientService, NotesService, PortfolioService } from 'src/app/services';
import { Client, Note, Portfolio, User } from 'src/app/models';

@Component({
  selector: 'app-profile-clients-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class EditProfileClientsDetailsComponent implements OnInit {
  @Input() client: Client;
  @Output() isAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() clientChange: EventEmitter<Client> = new EventEmitter<Client>();

  notes: Note[] = [];
  user: User;

  constructor(
    public clientService: ClientService,
    private noteService: NotesService,
    private authService: AuthService,
    private portfolioService: PortfolioService
  ) { }

  async ngOnInit() {
    const client: Client = this.client;
    this.user = this.authService.decode();

    if (client._id) {
      this.noteService.read(client._id).subscribe((results) => {
        this.notes = results;
      });
    }
  }

  deleteClientPortfolio(portfolio: Portfolio, idx: number) {
    this.portfolioService.delete(portfolio._id).subscribe((result) => {
      this.client.portfolio.slice(idx, 1);
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

  saveClientNote(note: Note) {
    this.noteService.create(note).subscribe((result) => {
      console.log('client note saved', result);
      note._id = result._id;
    });
  }

  toggleVisibility(portfolio: Portfolio) {
    portfolio.display = !portfolio.display;
  }

  imageNoteUploadCompleted($event, note: Note) {
    const client = this.client;
    let url = $event.url;
    note.images.push(url);
  }

  addClientNote() {
    const note: Note = new Note();
    const user: User = this.user;
    const client: Client = this.client;

    note.dateCreated = new Date();
    note.owner = user._id;
    note.clientId = client._id;

    this.notes.unshift(note);
  }

  deleteClientNote(note: Note) {
    const client: Client = this.client;

    this.noteService.delete(client._id, note._id).subscribe((result) => {
      const noteIndex = this.notes.findIndex((item) => item._id === note._id);
      this.notes.splice(noteIndex, 1);
    });
  }

  imageUploadCompleted($event) {
    const client: Client = this.client;
    const user: User = this.user;
    let url = $event.url;
    let portfolio = new Portfolio(url);
    portfolio.clientId = client._id;
    portfolio.publicId = $event.public_id;
    portfolio.owner = user._id;

    client.portfolio.push(portfolio);
    this.clientService.update(client._id, client).subscribe((result) => {
      console.log('client updated', result);
    });
  }

  cancel() {
    this.clientChange.emit(null);
  }
}
