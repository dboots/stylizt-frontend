import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit {
  slug: string;
  post: any;
  relatedPosts: any = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.postService.read(this.slug).subscribe((result) => {
        this.post = result.data;
        this.sanitizer.bypassSecurityTrustHtml(this.post.html);
        this.seoService.createCanonicalUrl();
        this.seoService.updateMetaTags(this.post.title, this.post.meta_title, this.post.meta_description);

        this.postService.browse({ tag: this.post.tags[0].slug }, 3).subscribe((posts) => {
          this.relatedPosts = posts.data.filter((post) => {
            return this.post.id !== post.id;
          });
        });
      });
    });
  }
}
