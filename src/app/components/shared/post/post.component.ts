import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    imports: [CommonModule],
    standalone: true
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

}
