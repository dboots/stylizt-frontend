import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from 'src/app/services/seo.service';

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
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let slug = params.get('slug');
      let tag: any;
      let posts: any[];

      this.postService.browse({ tag: slug }).subscribe((result: any) => {
        tag = result[0].tags.filter((item: any) => item.slug === slug)[0];
        let metaTitle: string = tag.meta_title || tag.name;
        let metaDescription: string = tag.meta_description || tag.description || `Blog posts for ${tag.name}`;
        posts = result;

        this.seoService.createCanonicalUrl();
        this.seoService.updateMetaTags(metaTitle, null, metaDescription);

        this.slug = slug;
        this.posts = posts;
        this.tag = tag;
      });
    });
  }
}
