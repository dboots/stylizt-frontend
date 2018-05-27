import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FileUploader, FileItem, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { AuthService, ClientService } from '../../../../services';
import { Client } from '../../../../models';

@Component({
  selector: 'app-page-stylistclientsdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class StylistClientsDetailPageComponent implements OnInit {
  detailForm: FormGroup;
  detailFormErrors: any;
  clientId: string;
  clientProfileImage: string;
  clientNote: string;

  uploader: FileUploader;
  uploadStatus: string;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.clientId = params['id'];
      this.clientService.detail(this.clientId, this.authService.token).subscribe((result) => {
        console.log(result['data']);
      });
    });

    this.initForm();
    this.initFileUpload();
  }

  initForm() {
    this.detailFormErrors = {
      name: {},
      zip: {}
    };

    this.detailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      zip: ['', Validators.required]
    });

    this.formValuesChanged();
    this.detailForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.detailFormErrors) {
      if (this.detailFormErrors.hasOwnProperty(field)) {
        this.detailFormErrors[field] = {};

        const control = this.detailForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.detailFormErrors[field] = control.errors;
        }
      }
    }
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
      form.append('folder', 'client_profile');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      // TODO: delete old file

      response = JSON.parse(response);
      // this.clientProfileImage = response[''];
      this.clientProfileImage = 'http://res.cloudipublic_idnary.com/drcvakvh3/image/upload/w_400/' + response['public_id'] + '.jpg';
    };

    this.uploader.onAfterAddingFile = (item: FileItem) => {
      this.uploadStatus = '';
    };

    this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      this.uploadStatus = 'Unable to add file';
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      this.uploadStatus = 'Upload image... ' + progress + '% complete';
    };
  }

  saveClient() {
    if (this.uploader.queue.length) {
      this.uploader.uploadAll();
    } else {

    }
    const name = this.detailForm.get('name').value;
    const zipcode = this.detailForm.get('zip').value;
    const body: Client = {
      name: this.detailForm.get('name').value,
      email: '',
      zip: this.detailForm.get('zip').value,
      image: '',
      owner: ''
    };
    this.clientService.update(this.clientId, body, this.authService.token).subscribe((result) => {
      console.log(result);
    }, (err) => {
      alert(err.error.messages[0]);
    });
  }
}
