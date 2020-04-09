import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPostItemComponent {
  @Input() post: any = {};
}
