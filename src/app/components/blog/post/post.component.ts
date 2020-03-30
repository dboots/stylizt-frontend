import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
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
    @Inject(DOCUMENT) private dom
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.postService.read(this.slug).subscribe((result) => {
        this.post = result.data;
        this.sanitizer.bypassSecurityTrustHtml(this.post.html);

        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL);
      });
    });

    this.postService.browse().subscribe((posts) => {
      this.relatedPosts = posts.data;
    });
  }
}
