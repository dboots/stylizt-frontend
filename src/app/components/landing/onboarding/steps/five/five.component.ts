import { Component, OnInit } from '@angular/core';
import { ClientService, StepService } from '../../../../../services';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from '../../../../../models/client.model';

@Component({
  selector: 'app-step-five',
  templateUrl: './five.component.html',
  styleUrls: ['./five.component.scss']
})
export class StepFiveComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    image: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  uploadImage: string;
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private stepService: StepService
  ) { }

  ngOnInit() {
    let nextAction = () => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    };

    this.stepService.nextActions.push(nextAction);
  }

  addClient() {
    let body = this.formGroup.value;

    this.clientService.create(body).subscribe((result) => {
      this.formGroup.reset();
      this.clients.push(result['data']);
    });
  }

  removeClient(clientToDelete: Client) {
    this.clientService.delete(clientToDelete._id).subscribe((_) => {
      this.clients = this.clients.filter((client) => client._id !== clientToDelete._id);
    });
  }

  imageUploadCompleted($event: any) {
    let url = $event.url;
    this.uploadImage = url;
    this.formGroup.controls['image'].setValue(url);
  }
}
