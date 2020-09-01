import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Portfolio, User } from 'src/app/models';
import { PortfolioService, AuthService } from 'src/app/services';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-profile-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class EditProfilePortfolioComponent implements OnInit {
  user: User;
  portfolio: Portfolio[] = [];
  captionControl: FormControl = new FormControl();

  constructor(
    private portfolioService: PortfolioService,
  ) { }

  ngOnInit() {
    this.portfolioService.read({ url: this.user.url }).subscribe((site: Site) => {
      this.portfolio = site.portfolio;
    });
  }

  delete(image: Portfolio) {
    this.portfolioService.delete(image._id).subscribe((result) => {
      this.portfolio = this.portfolio.filter((item) => {
        return image._id !== item._id;
      });
    });
  }

  save($event: any, portfolio: Portfolio) {
    if (portfolio._id) {
      this.portfolioService.update(portfolio).subscribe((result) => {
        console.log('portfolio saved', result, this.user);
      });
    }
  }

  imageUploadCompleted($event: any) {
    let url = $event.url;
    let portfolio = new Portfolio(url);
    portfolio.publicId = $event.public_id;

    this.portfolioService.create(portfolio).subscribe((result) => {
      console.log('portfolio created', result);
      this.portfolio.push(result);
    });
  }
}
