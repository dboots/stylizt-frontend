import { Component, OnInit } from '@angular/core';
import { UserService, PostService } from '../../services';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { User } from '../../models';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  formGroup: UntypedFormGroup;
  searchTimeoutId;
  results: User[] = [];
  posts: any[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private seoService: SeoService
  ) {
    this.formGroup = new UntypedFormGroup({
      query: new UntypedFormControl('', [])
    });
  }

  ngOnInit() {
    this.userService.search('').subscribe((results) => {
      this.results = results;
    });

    this.postService.browse().subscribe((results) => {
      this.posts = results;
    });

    this.seoService.updateMetaTags('Hair To Chair - Stylist Client Management & Portfolio Marketing Tools', null, 'Premium stylist client management tools at affordable rates. Manage, market and boost your stylist services to grow your business today. Free trial, No Credit card required');
    this.seoService.createCanonicalUrl();
  }

  getStylistBio(bio: string) {
    return (bio && bio.length > 100) ? bio.slice(0, 100) + '...' : (bio);
  }

  doSearch($event) {
    let query = this.formGroup.get('query').value;

    clearTimeout(this.searchTimeoutId);
    this.searchTimeoutId = setTimeout(() => {
      this.userService.search(query).subscribe((results) => {
        this.results = results;
      });
    }, 500);
  }
}
