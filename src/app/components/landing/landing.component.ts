import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services';
import { User, Post } from '../../models';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingPageComponent implements OnInit {
  params = null;
  stylists: User[] = [];
  posts: Post[] = [];
  state: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private seoService: SeoService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;
      this.updateMeta();
    });
  }

  ngOnInit() {
    this.state = this.params.state.replace('-', ' ');
    this.userService.read({ state: this.state }).subscribe((result: any) => {
      this.stylists = result.data;
    });
  }

  updateMeta() {
    let state = this.params.state;
    let location = state.toUpperCase();

    this.seoService.createCanonicalUrl();
    this.seoService.updateMetaTags('Talented personal hair stylists in ' + location, null, 'Personal hair stylists in ' + location);
  }
}
