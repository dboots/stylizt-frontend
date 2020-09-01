import { Component, OnInit } from '@angular/core';
import { User, Talent, Brand } from '../../../../../models';
import { FormGroup, FormControl } from '@angular/forms';
import { TalentService, BrandService, UserService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class EditProfileDetailsComponent implements OnInit {
  user: User;
  timeoutId: any;
  talents: Talent[] = [];
  brands: Brand[] = [];
  talentSearchResults: Talent[] = [];
  brandSearchResults: Brand[] = [];
  talentControl: FormControl = new FormControl();
  brandControl: FormControl = new FormControl();
  times: string[] = [];
  hours: string[][] = [];
  isSaving: boolean = false;
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private talentService: TalentService,
    private brandService: BrandService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let times: string[] = [];
    let timeString: string;
    let userHours: string[][] = this.user.hours;

    Object.keys(this.user).forEach((key) => {
      this.formGroup.addControl(key, new FormControl(this.user[key]));
    });

    console.log(this.formGroup.value);

    this.talentService.read().then((results) => {
      this.talents = results;
    });

    this.brandService.read().then((results) => {
      this.brands = results;
    });

    if (!this.user.hours) {
      for (let i = 0; i <= 6; i++) {
        this.hours.push(['9:00 AM', '5:00 PM']);
      }
    } else {
      this.hours = this.user.hours;

      if (!this.hours.length) {
        for (let i = 0; i <= 6; i++) {
          this.hours.push(['', '']);
        }
      }
    }

    for (let i = 0; i < 24; i++) {
      switch (true) {
        case (i === 0):
          timeString = '12:00 AM';
          break;
        case (i === 12):
          timeString = '12:00 PM';
          break;
        case (i > 12):
          timeString = i % 12 + ':00 PM';
          break;
        default:
          timeString = i + ':00 AM';
      }

      times.push(timeString);
    }

    this.user.hours = userHours || this.hours;
    this.times = times;
  }

  focusTalent() {
    this.talentSearchResults = this.talents.filter((talent) => {
      return this.user.talents.filter((result) => result._id === talent._id).length === 0;
    });
  }

  blurTalent() {
    this.timeoutId = setTimeout(() => {
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
    this.timeoutId = setTimeout(() => {
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

  save() {
    this.isSaving = true;
    this.user = this.formGroup.value;
    console.log(this.user);
    this.userService.update(this.user).subscribe((result) => {
      this.isSaving = false;
      this.authService.token = result.token;
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

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
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

  imageUploadCompleted($event) {
    this.user.image = $event.url;
  }

  changeBrand($event: any) {
    let value = $event.target.value;
    let timeoutId = this.timeoutId;
    let results = [];

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      results = this.brands.filter((brand) => brand.brand.match(new RegExp(value, 'i'))).filter((brand) => {
        return this.user.brands.filter((result) => result._id === brand._id).length === 0;
      });
      this.brandSearchResults = results;
    }, 500);

    this.brandSearchResults = results;
    this.timeoutId = timeoutId;
  }
}
