import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

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
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private dom
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let posts: any[];

      this.postService.browse({}, 12).subscribe((result: any) => {
        posts = result.data;

        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL);

        this.title.setTitle('Hair to Chair Blog Posts Title');

        this.meta.updateTag({
          name: 'title',
          content: 'Hair to Chair Blog Posts Meta Title'
        });

        this.meta.updateTag({
          name: 'description',
          content: `Hair to Chair Blog Posts`
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

        this.posts = posts;
      });
    });
  }
}
