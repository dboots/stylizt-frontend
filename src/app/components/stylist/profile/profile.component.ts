import { Component, OnInit } from '@angular/core';
import { User, Talent, Portfolio, Client } from '../../../models';
import {
  AuthService,
  UserService,
  TalentService,
  LocationService,
  ClientService,
  PortfolioService,
  BrandService
} from '../../../services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Brand } from '../../../models/brand.model';

@Component({
  selector: 'app-page-stylistprofile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class StylistProfilePageComponent implements OnInit {
  user: User = new User();
  responses: any[];
  status: string;
  talents: Talent[] = [];
  brands: Brand[] = [];
  modalRef: NgbModalRef;
  talentForm: FormGroup;
  brandForm: FormGroup;
  talent: FormControl;
  brand: FormControl;
  selectedTalents: Talent[] = [];
  selectedBrands: Brand[] = [];
  location: string = '';
  loading: boolean = false;
  clients: Client[] = [];
  portfolio: Portfolio[] = [];
  profileStrengths = {};
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private talentService: TalentService,
    private brandService: BrandService,
    private locationService: LocationService,
    private clientService: ClientService,
    private portfolioService: PortfolioService
  ) {
    this.formGroup = this.getFormGroup(this.user);
  }

  getFormGroup(model: any) {
    let formGroup: FormGroup = new FormGroup({});

    Object.keys(model).map((key) => {
      formGroup.addControl(key, new FormControl());
    });

    return formGroup;
  }

  ngOnInit() {
    this.talent = new FormControl();
    this.brand = new FormControl();
    this.talentForm = new FormGroup({
      talent: this.talent
    });

    this.brandForm = new FormGroup({
      brand: this.brand
    });

    this.user = this.authService.decode();
    this.talents = this.user.talents;
    this.brands = this.user.brands;

    this.portfolioService.read().subscribe((result) => {
      this.profileStrengths['portfolio'] = result.length >= 3;
    });

    this.clientService.read().then((result: any) => {
      this.clients = result;
      this.profileStrengths['clients'] = this.clients.length >= 3;
    });

    this.profileStrengths['image'] = this.user.image;
    this.profileStrengths['zip'] = this.user.zip;
    this.formGroup.patchValue(this.user);

    this.logVisit();
  }

  logVisit() {
    console.log('logging visit');
  }

  getLocation(zip) {
    this.loading = true;

    this.locationService.geocode(zip).subscribe((result: any) => {
      this.loading = false;
      if (result.status === 'OK') {
        let city: string = '';
        let state: string = '';
        let cityIndex: number = -1;
        let stateIndex: number = -1;
        let components = result.results[0].address_components;

        // if it has letters in the zip, it's not USA?
        if (isNaN(zip)) {
          cityIndex = components.findIndex((c) => {
            return c.types.indexOf('postal_town') > -1;
          });

          stateIndex = components.findIndex((c) => {
            return c.types.indexOf('administrative_area_level_1') > -1;
          });
        } else {
          cityIndex = components.findIndex((c) => {
            return c.types.indexOf('locality') > -1;
          });

          stateIndex = components.findIndex((c) => {
            return c.types.indexOf('administrative_area_level_1') > -1;
          });
        }

        city = components[cityIndex].long_name;
        state = components[stateIndex].long_name;

        this.formGroup.controls['city'].setValue(city);
        this.formGroup.controls['state'].setValue(state);
        this.location = city + ', ' + state;
      }
    });
  }

  scrollToTalents() {
    try {
      document.querySelector('#talents').scrollIntoView();
    } catch (e) {
      console.log(e);
    }
  }

  profileImageUploadCompleted(response) {
    let image =
      'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/' +
      response['public_id'] +
      '.jpg';
    this.user.image = image;
    this.formGroup.patchValue(this.user);
  }

  uploadAndUpdate() {
    this.formGroup.controls.talents.setValue(this.talents);
    this.formGroup.controls.brands.setValue(this.brands);
    this.update();
  }

  update() {
    let body = this.formGroup.value as User;
    this.userService.update(body).subscribe(
      (result: any) => {
        this.authService.token = result.token;
        this.status = 'Profile updated!';
      },
      (err) => {
        console.log('Error while updating user', err);
      }
    );
  }

  modal(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => { }, (reason) => { });
  }

  addTalent() {
    let talent: Talent = new Talent(this.talent.value);
    this.talentService.create(talent).subscribe(
      (result: any) => {
        this.modalRef.close();
        this.talentService.itemList.push(result.result);
        this.selectedTalents.push(result.result);
        this.talents.push(result.result);
      },
      (err) => { }
    );
  }

  addBrand() {
    let brand: Brand = new Brand(this.brand.value);
    this.brandService.create(brand).subscribe(
      (result: any) => {
        this.modalRef.close();
        this.brandService.itemList.push(result.result);
        this.selectedBrands.push(result.result);
        this.brands.push(result.result);
      },
      (err) => { }
    );
  }
}
