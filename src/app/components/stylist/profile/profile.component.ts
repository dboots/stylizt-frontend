import { Component, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'page-stylistprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class StylistProfilePage implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: 'https://api.cloudinary.com/v1_1/drcvakvh3'
  });

  constructor() {
  }

  ngOnInit() {
  }

}
