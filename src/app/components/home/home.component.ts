import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService, PortfolioService, TalentService, UserService, PostService } from '../../services';
import { Portfolio, User, Post } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomePageComponent implements OnInit {
  dropdownOptions: any[];
  currentOption;
  portfolio: Portfolio[];
  stylists: User[];
  posts: Post[];
  locations: any[] = [];
  
  slideConfig = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: false,
    nextArrow: false
  };
  
  constructor(
    private portfolioService: PortfolioService,
    private talentService: TalentService,
    private userService: UserService,
    private postService: PostService,
    private locationService: LocationService,
    private router: Router
  ) {

    this.locationService.network().subscribe((result: any) => {
      for (var idx in result.data) {
        let item = {};
        let state = result.data[idx];

        item['slug'] = state.toLowerCase().replace(/\s/g, '-');
        item['state'] = state;

        this.locations.push(item);
      }
    });
  }
  
  ngOnInit() {    
    this.talentService.read().then((result) => {
      this.dropdownOptions = result;
      this.currentOption = result[0];
    });
    
    // TODO: Convert result to Portfolio models
    this.portfolioService.search({}).subscribe((result: any) => {
      this.portfolio = result.data;
    }, (err) => {
      console.log(err);
    });
    
    this.userService.read({}).subscribe((result: any) => {
      this.stylists = result.data;
    });
    
    this.postService.getBlogs().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  selectLocationDD(location) {
    this.router.navigate(['/stylists-near-me/' + location]);
  }
}
