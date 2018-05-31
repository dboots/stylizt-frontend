import { Component, OnInit, NgZone } from '@angular/core';
import { FileUploader, FileItem, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { User } from '../../../models';
import { AuthService, UserService } from '../../../services';

@Component({
  selector: 'app-page-stylistprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class StylistProfilePageComponent implements OnInit {
  uploader: FileUploader;
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

    const uploaderOptions: FileUploaderOptions = {
      url: 'https://api.cloudinary.com/v1_1/drcvakvh3/upload',
      allowedMimeType: ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      autoUpload: false,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [{
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'k9kduvri');
      form.append('folder', 'profile');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      // TODO: delete old file

      response = JSON.parse(response);
      this.user.image = response['public_id'];
      this.update();
    };

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      this.status = '';
    };

    this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      this.status = 'Unable to add file';
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      this.status = 'Upload image... ' + progress + '% complete';
    };
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
