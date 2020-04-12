import { Component } from '@angular/core';
import { User } from '../../../../../models';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class EditProfileDetailsComponent {
  user: User;

  constructor() { }
}
