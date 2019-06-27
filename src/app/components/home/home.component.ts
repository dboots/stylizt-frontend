import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
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

  constructor(private userService: UserService) {
    this.formGroup = new FormGroup({
      query: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.userService.search('').subscribe((results) => {
      this.results = results['data'];
    });
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
