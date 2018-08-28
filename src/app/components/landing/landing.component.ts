import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService, PostService } from '../../services';
import { User, Post } from '../../models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingPageComponent implements OnInit {
  private params = null;
  private stylists: User[] = [];
  private posts: Post[] = [];
  private state: string = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params
      this.updateMeta();
    });
  }

  ngOnInit() {
    this.state = this.params.state.replace('-', ' ');
    this.userService.read({state: this.state}).subscribe((result: any) => {
      this.stylists = result.data;
    });

    this.postService.getBlogs().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }



  updateMeta() {
    let state = this.params.state;
    let location = state.toUpperCase()
    
    this.title.setTitle('Talented personal hair stylists in ' + location);
    this.meta.updateTag({
      name: 'description',
      content: 'Personal hair stylists in ' + location
    });
  }
}
