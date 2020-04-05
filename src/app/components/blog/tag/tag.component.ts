import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTagComponent implements OnInit {
  slug: string;
  posts: any[];
  tag: any;

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
      let slug = params.get('slug');
      let tag: any;
      let posts: any[];

      this.postService.browse({ tag: slug }).subscribe((result: any) => {
        posts = result.data;
        tag = posts[0].tags.filter((item: any) => item.slug === slug)[0];

        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL);

        this.title.setTitle(tag.meta_title || tag.name);

        this.meta.updateTag({
          name: 'title',
          content: tag.meta_title || tag.name
        });

        this.meta.updateTag({
          name: 'description',
          content: tag.meta_description || tag.description || `Blog posts for ${tag.name}`
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

        this.slug = slug;
        this.posts = posts;
        this.tag = tag;
      });
    });
  }
}
