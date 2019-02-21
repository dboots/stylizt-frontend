import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    let url = window.location.origin.split('://')[1];
    let parts = url.split('.');
    let subdomain = (parts.length == 3) ? parts[0] : null;

    if (environment.production && subdomain && subdomain != 'www') {
      console.log('doing things with subdomain', subdomain);
      this.router.navigate(['portfolio/' + subdomain]);
    }
    

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0);
    });
  }
}
