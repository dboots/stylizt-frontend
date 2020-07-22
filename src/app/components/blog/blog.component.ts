import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogHomeComponent implements OnInit {
  posts: any[];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private seoService: SeoService,
  ) { }

  ngOnInit() {
    const seoService: SeoService = this.seoService;
    this.route.paramMap.subscribe((params) => {
      let posts: any[];

      this.postService.browse({}, 12).subscribe((result: any) => {
        posts = result;
        seoService.createCanonicalUrl();
        seoService.updateMetaTags('Management & Marketing Tips for Hairstylists and Barbers', null, 'Hair to Chair provides regular and updated articles for all independent stylists, to help them succeed in business. Please check back regularly for updated tips on management and marketing your stylist business.');
        this.posts = posts;
      });
    });
  }
}
