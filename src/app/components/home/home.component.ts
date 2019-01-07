import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { Portfolio, User, Post } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomePageComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) {
  }
  
  ngOnInit() {    
  }
}
