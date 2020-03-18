import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService, PostService } from '../../services';
import { User, Post } from '../../models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingPageComponent implements OnInit {
  params = null;
  stylists: User[] = [];
  posts: Post[] = [];
  state: string = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;
      this.updateMeta();
    });
  }

  ngOnInit() {
    this.state = this.params.state.replace('-', ' ');
    this.userService.read({ state: this.state }).subscribe((result: any) => {
      this.stylists = result.data;
    });
  }

  updateMeta() {
    let state = this.params.state;
    let location = state.toUpperCase();

    this.title.setTitle('Talented personal hair stylists in ' + location);
    this.meta.updateTag({
      name: 'description',
      content: 'Personal hair stylists in ' + location
    });
  }
}
