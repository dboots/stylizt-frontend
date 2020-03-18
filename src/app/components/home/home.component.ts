import { Component, OnInit } from '@angular/core';
import { UserService, PostService } from '../../services';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  formGroup: FormGroup;
  searchTimeoutId;
  results: User[] = [];
  posts: any[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {
    this.formGroup = new FormGroup({
      query: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.userService.search('').subscribe((results) => {
      this.results = results['data'];
    });

    this.postService.browse().subscribe((results) => {
      console.log(results);
      this.posts = results['data'];
    });
  }

  getStylistBio(bio: string) {
    return (bio && bio.length > 100) ? bio.slice(0, 100) + '...' : (bio);
  }

  doSearch($event) {
    let query = this.formGroup.get('query').value;

    clearTimeout(this.searchTimeoutId);
    this.searchTimeoutId = setTimeout(() => {
      this.userService.search(query).subscribe((results) => {
        this.results = results['data'];
      });
    }, 500);
  }
}
