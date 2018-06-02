import { Component, OnInit, NgZone } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { User } from '../../../models';
import { AuthService, UserService } from '../../../services';

@Component({
  selector: 'app-page-stylistprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class StylistProfilePageComponent implements OnInit {
  user: User;
  responses: any[];
  status: string;

  constructor(
    private cloudinary: Cloudinary,
    private authService: AuthService,
    private userService: UserService,
    private zone: NgZone,
  ) {
    this.responses = [];
  }

  ngOnInit() {
    this.user = this.authService.decode();
  }

  profileImageUploadCompleted(response) {
    this.user.image = 'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/' + response['public_id'] + '.jpg';
  }

  uploadAndUpdate() {
    this.update();
  }

  update() {
    this.userService.update(this.authService.token, this.user).subscribe((result: any) => {
      this.authService.token = result.token;
      this.status = 'Profile updated!';
    }, (err) => {
      console.log('Error while updating user', err);
    });
  }

}
