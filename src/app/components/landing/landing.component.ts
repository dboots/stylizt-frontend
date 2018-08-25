import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingPageComponent implements OnInit {
  private params = null;
  private stylists: User[] = [];

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.route.params.subscribe((params) => {
      this.params = params
      this.updateMeta();
    });
  }

  ngOnInit() {
    this.userService.read({state: this.params.state}).subscribe((result: any) => {
      this.stylists = result.data;
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
