import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FileUploader, FileItem, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  AuthService,
  ClientService,
  PortfolioService
} from '../../../../services';
import { Client, Portfolio } from '../../../../models';

@Component({
  selector: 'app-page-stylistclientsdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class StylistClientsDetailPageComponent implements OnInit {
  modalRef: NgbModalRef;
  detailForm: FormGroup;
  detailFormErrors: any;
  clientId: string;
  clientNote: string;

  uploader: FileUploader;
  uploadStatus: string;
  clientProfileImage: string;
  noteImageUploader: FileUploader;
  noteImageUploadStatus: string;
  clientNoteImage: string;
  portfolioImageUploader: FileUploader;
  portfolioImageUploadStatus: string;
  clientPortfolioImage: string[] = [];
  clientPortfolios: Portfolio[] = [];
  selectedImageForModal: string;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private portfolioService: PortfolioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.clientId = params['id'];
      this.clientService.detail(this.clientId, this.authService.token).subscribe((result: any) => {
        this.detailForm.patchValue({
          name: result.data.name,
          zip: result.data.zip,
          email: result.data.email
        });
        this.clientProfileImage = result.data.image;
        this.clientPortfolios = result.data.portfolio;
      });
    });

    this.initForm();
    this.initFileUpload();
    this.initNoteImageFileUpload();
    this.initPortfolioImageFileUpload();
  }

  initForm() {
    this.detailFormErrors = {
      name: {},
      zip: {},
      email: {}
    };

    this.detailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      zip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
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
      console.log('UPLOADEDING!!!!', item, response, status, headers);

      response = JSON.parse(response);
      // this.clientProfileImage = response[''];
      this.clientProfileImage = 'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/' + response['public_id'] + '.jpg';
      this.updateClientDetails();
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

  initNoteImageFileUpload() {
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

    this.noteImageUploader = new FileUploader(uploaderOptions);

    this.noteImageUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'k9kduvri');
      form.append('folder', 'client_note');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.noteImageUploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      // TODO: delete old file

      response = JSON.parse(response);
      // this.clientProfileImage = response[''];
      this.clientNoteImage = 'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/' + response['public_id'] + '.jpg';
    };

    this.noteImageUploader.onAfterAddingFile = (item: FileItem) => {
      this.noteImageUploadStatus = '';
    };

    this.noteImageUploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      this.noteImageUploadStatus = 'Unable to add file';
    };

    this.noteImageUploader.onProgressItem = (fileItem: any, progress: any) => {
      this.noteImageUploadStatus = 'Upload image... ' + progress + '% complete';
    };
  }

  initPortfolioImageFileUpload() {
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

    this.portfolioImageUploader = new FileUploader(uploaderOptions);

    this.portfolioImageUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'k9kduvri');
      form.append('folder', 'client_portfolio');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.portfolioImageUploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      // TODO: delete old file

      response = JSON.parse(response);
      const portfolioImage = `http://res.cloudinary.com/drcvakvh3/image/upload/w_400/${response['public_id']}.jpg`;
      this.addPortfolio(portfolioImage);
      // Temp solution. Should be removed.
      this.clientPortfolioImage.push(portfolioImage);
    };

    this.portfolioImageUploader.onAfterAddingFile = (item: FileItem) => {
      this.portfolioImageUploadStatus = '';
      this.portfolioImageUploader.uploadAll();
    };

    this.portfolioImageUploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
      this.portfolioImageUploadStatus = 'Unable to add file';
    };

    this.portfolioImageUploader.onProgressItem = (fileItem: any, progress: any) => {
      this.portfolioImageUploadStatus = 'Upload image... ' + progress + '% complete';
    };
  }

  onUpdate() {
    if (this.uploader.queue.length) {
      this.uploader.uploadAll();
    } else {
      this.updateClientDetails();
    }
  }

  updateClientDetails() {
    const name = this.detailForm.get('name').value;
    const zipcode = this.detailForm.get('zip').value;
    const body: Client = {
      name: this.detailForm.get('name').value,
      email: this.detailForm.get('email').value,
      zip: this.detailForm.get('zip').value,
      image: this.clientProfileImage
    };
    this.clientService.update(this.clientId, body, this.authService.token).subscribe((result) => {
      console.log(result);
    }, (err) => {
      alert(err.error.messages[0]);
    });
  }

  addPortfolio(portfolioImage) {
    const portfolio: Portfolio = new Portfolio(portfolioImage, '', this.clientId);
    this.portfolioService.create(portfolio.clientId, portfolio, this.authService.token)
      .subscribe((result: any) => {
        this.clientPortfolios.push(result);
      }, (err) => {

      });
  }

  openPortfolioDetailModal(portfolioDetailModal, image) {
    this.selectedImageForModal = image;
    this.modalRef = this.modalService.open(portfolioDetailModal, { windowClass: 'client-portfolio-modal', size: 'lg' });
  }

  deletePortfolio() {
    const selectedPortfolioToDelete: Portfolio = null;
    this.portfolioService.delete(selectedPortfolioToDelete.clientId, selectedPortfolioToDelete.id, this.authService.token)
      .subscribe((result: any) => {
        this.modalRef.close();
      }, (err) => {
        this.modalRef.close();
      });
  }

  updateCaptionForPortfolio() {
    const selectedPortfolioToUpdate: Portfolio = null;
    this.portfolioService.update(selectedPortfolioToUpdate.clientId, selectedPortfolioToUpdate.id, selectedPortfolioToUpdate, this.authService.token)
      .subscribe((result: any) => {
        this.modalRef.close();
      }, (err) => {
        this.modalRef.close();
      });
  }

  addClientNote() {
    if (this.noteImageUploader.queue.length) {
      this.noteImageUploader.uploadAll();
    } else {

    }
  }
}
