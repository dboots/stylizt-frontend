import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-cloudinary-uploader',
  templateUrl: './cloudinary-uploader.component.html',
  styleUrls: ['./cloudinary-uploader.component.scss']
})
export class CloudinaryUploaderComponent implements OnInit {
  uploader: FileUploader;
  @Input() folderName: string;
  @Input() buttonName: string;
  @Output() completeItem: EventEmitter<any> = new EventEmitter();
  @Output() afterAddingFile: EventEmitter<any> = new EventEmitter();
  @Output() whenAddingFileFailed: EventEmitter<any> = new EventEmitter();
  @Output() progressItem: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.initFileUpload();
  }

  initFileUpload() {
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
      form.append('folder', this.folderName);
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      // TODO: delete old file

      response = JSON.parse(response);
      this.completeItem.emit(response);
    };

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      this.uploader.uploadAll();
      this.afterAddingFile.emit();
    };

    this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      this.whenAddingFileFailed.emit();
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      this.progressItem.emit();
    };
  }
}
