import { Component, OnInit } from "@angular/core";
import { User, Talent, Portfolio, Client } from "../../../models";
import {
  AuthService,
  UserService,
  TalentService,
  LocationService,
  ClientService,
  PortfolioService,
  BrandService,
} from "../../../services";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { Brand } from "../../../models/brand.model";
import { Site } from "src/app/models/site";

@Component({
  selector: "app-page-stylistprofile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class StylistProfilePageComponent implements OnInit {
  user: User = new User();
  responses: any[];
  status: string;
  talents: Talent[] = [];
  brands: Brand[] = [];
  modalRef: NgbModalRef;
  talentForm: UntypedFormGroup;
  brandForm: UntypedFormGroup;
  talent: UntypedFormControl;
  brand: UntypedFormControl;
  selectedTalents: Talent[] = [];
  selectedBrands: Brand[] = [];
  location: string = "";
  loading: boolean = false;
  clients: Client[] = [];
  portfolio: Portfolio[] = [];
  profileStrengths = {};
  formGroup: UntypedFormGroup;

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
    let formGroup: UntypedFormGroup = new UntypedFormGroup({});

    Object.keys(model).map((key) => {
      formGroup.addControl(key, new UntypedFormControl());
    });

    return formGroup;
  }

  ngOnInit() {
    this.talent = new UntypedFormControl();
    this.brand = new UntypedFormControl();
    this.talentForm = new UntypedFormGroup({
      talent: this.talent,
    });

    this.brandForm = new UntypedFormGroup({
      brand: this.brand,
    });

    this.user = this.authService.decode();
    this.talents = this.user.talents;
    this.brands = this.user.brands;

    this.portfolioService.read(true).subscribe((result: Portfolio[]) => {
      this.profileStrengths["portfolio"] = result.length >= 3;
    });

    this.clientService.read().then((result: Client[]) => {
      this.clients = result;
      this.profileStrengths["clients"] = this.clients.length >= 3;
    });

    this.profileStrengths["image"] = this.user.image;
    this.profileStrengths["zip"] = this.user.zip;
    this.formGroup.patchValue(this.user);

    this.logVisit();
  }

  logVisit() {
    console.log("logging visit");
  }

  getLocation(zip: string) {
    this.loading = true;

    this.locationService.geocode(zip).subscribe((result: any) => {
      const location = this.locationService.parse(result, parseInt(zip));
      this.formGroup.controls["city"].setValue(location[0]);
      this.formGroup.controls["state"].setValue(location[1]);
      this.location = location[0] + ", " + location[1];
      this.loading = false;
    });
  }

  scrollToTalents() {
    try {
      document.querySelector("#talents").scrollIntoView();
    } catch (e) {
      console.log(e);
    }
  }

  profileImageUploadCompleted(response) {
    let image =
      "http://res.cloudinary.com/drcvakvh3/image/upload/w_400/" +
      response["public_id"] +
      ".jpg";
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
        this.status = "Profile updated!";
      },
      (err) => {
        console.log("Error while updating user", err);
      }
    );
  }

  modal(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
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
      (err) => {}
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
      (err) => {}
    );
  }
}
