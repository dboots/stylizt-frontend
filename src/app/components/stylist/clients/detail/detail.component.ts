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
  notesImageUploader: FileUploader;
  notesImageUploadStatus: string;
  clientNotesImages: string[] = [];
  portfolioImageUploader: FileUploader;
  portfolioImageUploadStatus: string;
  clientPortfolioImages: string[] = [];
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

  profileImageUploadCompleted(response) {
    console.log(12312312312, response);
    this.clientProfileImage = 'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/' + response['public_id'] + '.jpg';
  }

  notesImageUploadCompleted(response) {
    const image = `http://res.cloudinary.com/drcvakvh3/image/upload/w_400/${response['public_id']}.jpg`;
    // Temp solution. Should be removed.
    this.clientNotesImages.push(image);
  }

  portfolioImageUploadCompleted(response) {
    const image = `http://res.cloudinary.com/drcvakvh3/image/upload/w_400/${response['public_id']}.jpg`;
    this.addPortfolio(image);
    // Temp solution. Should be removed.
    this.clientPortfolioImages.push(image);
  }

  onUpdate() {
    this.updateClientDetails();
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
    // if (this.notesImageUploader.queue.length) {

    // } else {

    // }
  }
}
