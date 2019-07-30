import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-cloudinary-uploader',
  templateUrl: './cloudinary-uploader.component.html',
  styleUrls: ['./cloudinary-uploader.component.scss']
})
export class CloudinaryUploaderComponent implements OnInit {
  uploader: FileUploader;
  @Input() folderName: string;
  @Input() buttonName: string;
  @Input() allowMultiple: boolean = false;
  @Output() completeItem: EventEmitter<any> = new EventEmitter();
  @Output() afterAddingFile: EventEmitter<any> = new EventEmitter();
  @Output() whenAddingFileFailed: EventEmitter<any> = new EventEmitter();
  @Output() progressItem: EventEmitter<any> = new EventEmitter();
  @Output() uploadComplete: EventEmitter<any> = new EventEmitter();
  @Output() startUpload: EventEmitter<any> = new EventEmitter();
  showLoadingScreen: boolean;
  loadingProgress: number = 0;
  fileCount: number = 0;
  currentFile: number = 0;

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
      this.currentFile++;

      if (this.fileCount === this.currentFile) {
        this.showLoadingScreen = false;
        this.uploadComplete.emit();
        this.loadingProgress = 0;

        if (!this.allowMultiple) {
          this.fileCount = 0;
          this.currentFile = 0;
        }
      }
    };

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      this.fileCount++;
      this.uploader.uploadAll();
      this.afterAddingFile.emit();
      this.showLoadingScreen = true;
      this.startUpload.emit();
    };

    this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      this.whenAddingFileFailed.emit();
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      console.log('onProgressItem', fileItem, progress);
      this.loadingProgress = progress;
      this.progressItem.emit();
    };
  }

  onFileChange($event) {
    console.log('onFileChange', $event.target.files.length);
  }
}
