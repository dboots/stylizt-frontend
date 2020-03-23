import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.postService.read(this.slug).subscribe((result) => {
        this.post = result.data;
        this.sanitizer.bypassSecurityTrustHtml(this.post.html);
      });
    });

    this.postService.browse().subscribe((posts) => {
      this.relatedPosts = posts.data;
    });
  }
}
