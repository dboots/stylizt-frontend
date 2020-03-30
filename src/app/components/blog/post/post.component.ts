import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

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
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private dom
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.postService.read(this.slug).subscribe((result) => {
        console.log(result.data);
        this.post = result.data;
        this.sanitizer.bypassSecurityTrustHtml(this.post.html);

        // TODO: Move to a SEO Service
        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL);

        this.title.setTitle(this.post.title);

        this.meta.updateTag({
          name: 'title',
          content: this.post.meta_title
        });

        this.meta.updateTag({
          name: 'description',
          content: this.post.meta_description
        });

        this.meta.updateTag({
          name: 'author',
          content: 'Hair to Chair'
        });

        this.meta.updateTag({
          name: 'publisher',
          content: 'Hair to Chair'
        });

        this.meta.updateTag({
          name: 'robots',
          content: 'index, follow (same for all)'
        });
      });
    });

    this.postService.browse().subscribe((posts) => {
      this.relatedPosts = posts.data;
    });
  }
}
