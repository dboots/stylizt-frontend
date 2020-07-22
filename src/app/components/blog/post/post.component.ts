import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';
import { Post } from 'src/app/models';

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
    const seoService: SeoService = this.seoService;
    const postService: PostService = this.postService;

    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      postService.read(slug).subscribe((result) => {
        const post: any = result;
        this.sanitizer.bypassSecurityTrustHtml(post.html);
        seoService.createCanonicalUrl();

        if (post.feature_image) {
          seoService.updateMetaImage(post.feature_image);
        }

        seoService.updateMetaTags(post.title, post.meta_title, post.meta_description);

        postService.browse({ tag: post.tags[0].slug }, 3).subscribe((posts) => {
          this.relatedPosts = posts.filter((related) => {
            return post.id !== related.id;
          });
        });

        this.slug = slug;
        this.post = post;
      });
    });
  }
}
