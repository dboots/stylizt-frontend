import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Portfolio, User } from 'src/app/models';
import { PortfolioService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-profile-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  viewProviders: [{
    provide: ControlContainer, useExisting: FormGroupDirective
  }],
})
export class EditProfilePortfolioComponent implements OnInit {
  user: User;
  portfolio: Portfolio[];
  captionControl: FormControl = new FormControl();

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.portfolioService.read({ url: this.user.url }).subscribe((result) => {
      this.portfolio = result.portfolio;
    });
  }

  delete(image: Portfolio) {
    this.portfolioService.delete(image._id, this.authService.token).subscribe((result) => {
      this.portfolio = this.portfolio.filter((item) => {
        return image._id !== item._id;
      });
    });
  }

  save($event: any, portfolio: Portfolio) {
    if (portfolio._id) {
      this.portfolioService.update(portfolio, this.authService.token).subscribe((result) => {
        console.log('portfolio saved', result, this.user);
      });
    }
  }

  imageUploadCompleted($event: any) {
    let url = $event.url;
    let portfolio = new Portfolio(url);
    portfolio.publicId = $event.public_id;

    this.portfolioService.create(portfolio, this.authService.token).subscribe((result) => {
      console.log('portfolio created', result);
      this.portfolio.push(result);
    });
  }
}
