import { Component, OnInit } from '@angular/core';
import { User, Talent, Brand } from '../../../../../models';
import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';
import { TalentService, BrandService } from 'src/app/services';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class EditProfileDetailsComponent implements OnInit {
  user: User;
  timeoutId: number;
  talents: Talent[] = [];
  brands: Brand[] = [];
  talentSearchResults: Talent[] = [];
  brandSearchResults: Brand[] = [];
  talentControl: FormControl = new FormControl();
  brandControl: FormControl = new FormControl();

  constructor(
    private talentService: TalentService,
    private brandService: BrandService
  ) { }

  ngOnInit() {
    this.talentService.read().then((results) => {
      this.talents = results;
    });

    this.brandService.read().then((results) => {
      this.brands = results;
    });
  }

  focusTalent() {
    this.talentSearchResults = this.talents.filter((talent) => {
      return this.user.talents.filter((result) => result._id === talent._id).length === 0;
    });
  }

  blurTalent() {
    this.timeoutId = window.setTimeout(() => {
      this.talentSearchResults = [];
      this.talentControl.reset();
    }, 250);
  }

  focusBrand() {
    this.brandSearchResults = this.brands.filter((brand) => {
      return this.user.brands.filter((result) => result._id === brand._id).length === 0;
    });
  }

  blurBrand() {
    this.timeoutId = window.setTimeout(() => {
      this.brandSearchResults = [];
      this.brandControl.reset();
    }, 250);
  }

  cancelBrand() {
    this.brandSearchResults = [];
    this.brandControl.reset();
  }

  cancelTalent() {
    this.talentSearchResults = [];
    this.talentControl.reset();
  }

  addTalent(talent: Talent) {
    clearTimeout(this.timeoutId);
    this.user.talents.push(talent);
    this.talentSearchResults = this.talents.filter((item) => {
      return this.user.talents.filter((result) => result._id === item._id).length === 0;
    });
  }

  addNewTalent() {
    const value = this.talentControl.value;
    const talent = new Talent(value);
    this.talentService.create(talent).subscribe((result) => {
      this.user.talents.push(result);
      this.talentControl.reset();
    });
  }

  changeTalent($event: any) {
    let value = $event.target.value;
    let timeoutId = this.timeoutId;
    let results = [];

    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      results = this.talents.filter((talent) => talent.talent.match(new RegExp(value, 'i'))).filter((talent) => {
        return this.user.talents.filter((result) => result._id === talent._id).length === 0;
      });
      this.talentSearchResults = results;
    }, 500);

    this.talentSearchResults = results;
    this.timeoutId = timeoutId;
  }

  addBrand(brand: Brand) {
    clearTimeout(this.timeoutId);
    this.user.brands.push(brand);
    this.brandSearchResults = this.brands.filter((item) => {
      return this.user.brands.filter((result) => result._id === item._id).length === 0;
    });
  }

  removeTalent(talent: Talent) {
    this.user.talents = this.user.talents.filter((item) => item._id !== talent._id);
  }

  removeBrand(brand: Brand) {
    this.user.brands = this.user.brands.filter((item) => item._id !== brand._id);
  }

  addNewBrand() {
    const value = this.brandControl.value;
    const brand = new Brand(value);
    this.brandService.create(brand).subscribe((result) => {
      this.user.brands.push(result);
      this.brandControl.reset();
    });
  }

  changeBrand($event: any) {
    let value = $event.target.value;
    let timeoutId = this.timeoutId;
    let results = [];

    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      results = this.brands.filter((brand) => brand.brand.match(new RegExp(value, 'i'))).filter((brand) => {
        return this.user.brands.filter((result) => result._id === brand._id).length === 0;
      });
      this.brandSearchResults = results;
    }, 500);

    this.brandSearchResults = results;
    this.timeoutId = timeoutId;
  }
}
