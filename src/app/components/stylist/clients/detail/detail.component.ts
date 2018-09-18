import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {
  AuthService,
  ClientService,
  PortfolioService,
  NotesService
} from '../../../../services';
import {
  Client,
  Portfolio,
  Notes,
  NotesMockData,
  Talent
} from '../../../../models';

@Component({
  selector: 'app-page-stylistclientsdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class StylistClientsDetailPageComponent implements OnInit {
  modalRef: NgbModalRef;
  detailForm: FormGroup;
  detailFormErrors: any;
  clientId: string;
  talents: Talent[] = [];
  portfolioActionLabel = 'Add to Portfolio';

  uploadStatus: string;
  clientProfileImage: string;
  updateStatus: string;

  portfolioImageUploadStatus: string;
  clientPortfolioImages: string[] = [];
  clientPortfolios: Portfolio[] = [];
  selectedPortfolioItem: Portfolio;

  notesImageUploadStatus: string;
  clientNotesImages: string[] = [];
  clientNote: string;
  isPublicNotes: boolean;
  clientNotes: Notes[] = [];
  isNotesFormOpened: boolean;
  portfolioItem: Portfolio = new Portfolio('');

  currentIndex = -1;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private portfolioService: PortfolioService,
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.checkCache();
      this.clientId = params['id'];
      this.clientService.detail(this.clientId).subscribe((result: any) => {
        this.detailForm.patchValue({
          name: result.data.name,
          zip: result.data.zip,
          email: result.data.email,
          phone: result.data.phone
        });

        this.clientProfileImage = result.data.image;

        this.clientPortfolios = result.data.portfolio.map((p) => {
          return new Portfolio(p.image, p.caption, p.talents, true, p.clientId, p._id)
        });

        this.currentIndex = this.clientPortfolios.length - 1;
        this.clientNotes = result.data.notes;
        // For Test Only, should be removed
        this.clientNotes = NotesMockData;
      });
    });

    this.initForm();
  }

  async checkCache() {
    if (!this.clientService.clients) {
      await this.clientService.read();
    }
  }

  initForm() {
    this.detailFormErrors = {
      name: {},
      zip: {},
      email: {}
    };

    this.detailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      zip: [''],
      email: [''],
      phone: ['']
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
    //this.clientPortfolioImages.push(image);
  }

  onUpdate() {
    this.updateClientDetails();
  }

  updateClientDetails() {
    const body: Client = {
      name: this.detailForm.get('name').value,
      email: this.detailForm.get('email').value,
      zip: this.detailForm.get('zip').value,
      phone: this.detailForm.get('phone').value
    };

    this.clientService.update(this.clientId, body).subscribe((result: any) => {
      const idx = this.clientService.clients.findIndex((x: Client) => {
        return x._id === result.data._id;
      });

      result.data.portfolio = this.clientPortfolios;
      this.clientService.clients[idx] = result.data;
      this.updateStatus = 'Client Updated';
    }, (err) => {
      alert(err.error.messages[0]);
    });
  }

  addPortfolio(portfolioImage) {
    this.currentIndex++;
    this.clientPortfolios[this.currentIndex].image = portfolioImage;

    this.portfolioService.create(this.clientPortfolios[this.currentIndex].toPayload(), this.authService.token)
      .subscribe((result: any) => {
        this.clientPortfolios[this.currentIndex] = result.data;
        this.clientPortfolios[this.currentIndex].loading = false;
      }, (err) => {

      });
  }

  fileAdded() {
    const talents = [];
    const portfolio: Portfolio = new Portfolio(this.clientId, '', talents, false);
    portfolio.loading = true;
    this.clientPortfolios.push(portfolio);
  }

  openPortfolioDetailModal(portfolioDetailModal, portfolioItem) {
    this.selectedPortfolioItem = portfolioItem;
    this.modalRef = this.modalService.open(portfolioDetailModal, { windowClass: 'client-portfolio-modal', size: 'lg' });
  }

  imageUploadCompleted($event) {
    this.portfolioItem.image = `http://res.cloudinary.com/drcvakvh3/image/upload/w_400/${$event['public_id']}.jpg`;
  }

  portfolioAction() {
    if (this.portfolioItem._id) {
      this.updatePortfolio();
    } else {
      this.addToPortfolio();
    }
  }

  addToPortfolio() {
    this.portfolioItem.clientId = this.clientId;

    this.portfolioService.create(this.portfolioItem, this.authService.token)
    .subscribe((result: any) => {
      this.portfolioItem._id = result.data._id;
      this.clientPortfolios.push(this.portfolioItem);
      this.modalRef.close();
    }, (err) => {
      console.log('unable to add to portfolio', err);
    });
  }

  showModal(modal, item) {
    if (item && item._id) {
      this.portfolioItem = item;
      this.portfolioActionLabel = 'Update Portfolio';
    } else {
      this.portfolioItem = new Portfolio('');
      this.portfolioActionLabel = 'Add to Portfolio';
    }

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  deletePortfolio(portfolio: Portfolio) {
    this.portfolioService.delete(portfolio._id, this.authService.token)
      .subscribe((result: any) => {
        let idx = this.clientPortfolios.findIndex((p: Portfolio) => p._id === portfolio._id);
        this.clientPortfolios.splice(idx, 1);
        this.currentIndex--;

        idx = this.clientService.clients.findIndex((x: Client) => {
          return x._id === this.clientId;
        });

        this.clientService.clients[idx].portfolio = this.clientPortfolios;
        this.modalRef.close();
      }, (err) => {
        this.modalRef.close();
      });
  }

  updatePortfolio() {
    this.portfolioService.update(this.portfolioItem, this.authService.token)
      .subscribe((result: any) => {
        //this.portfolioItem.talents = result.data.talents;
        this.modalRef.close();
      }, (err) => {
        this.modalRef.close();
      });
  }

  openNotesForm() {
    this.isNotesFormOpened = !this.isNotesFormOpened;
  }

  removeNoteImage(idx) {
    this.clientNotesImages.splice(idx, 1);
  }

  cancelNote() {
    this.clientNote = '';
    this.isPublicNotes = false;
    this.clientNotesImages = [];
    this.isNotesFormOpened = false;
  }

  addClientNote() {
    if (this.isPublicNotes === true) {
      const modalRef = this.modalService.open(ConfirmDialogComponent, {centered: true});
      modalRef.componentInstance.confirmMessage = 'Are you sure to post a public note?';
      modalRef.result.then((result) => {
        if (result === 'Confirm click') {
          this.postNote();
        }
      }, (reason) => {
      });
    } else {
      this.postNote();
    }
  }

  postNote() {
    const postDate = new Date();
    const notes: Notes = new Notes(this.clientId, this.clientNote, new Date(), this.isPublicNotes, this.clientNotesImages);
    this.notesService.create(notes.clientId, notes, this.authService.token)
      .subscribe((result: any) => {
        this.clientNotes.push(result);
      }, (err) => {

      });
  }
}
