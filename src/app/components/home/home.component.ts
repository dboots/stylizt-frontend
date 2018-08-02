import { Component, OnInit } from '@angular/core';
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
    private postService: PostService
  ) { }
  
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
    
    this.userService.read().subscribe((result: any) => {
      this.stylists = result.data;
    });
    
    this.postService.getBlogs().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
