import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'app-page-stylist-home',
  templateUrl: './stylist-home.component.html',
  styleUrls: ['./stylist-home.component.scss']
})
export class StylistHomePageComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.decode();
  }

  ngOnInit() { }
}
