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
    this.route.paramMap.subscribe((params) => {
      let posts: any[];

      this.postService.browse({}, 12).subscribe((result: any) => {
        posts = result.data;

        this.seoService.createCanonicalUrl();
        this.seoService.updateMetaTags('Hair to Chair Blog Posts Title', null, 'Hair to Chair Blog Posts');
        this.posts = posts;
      });
    });
  }
}
