import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    let production = environment.production;
    let location = '';
    let subdomain;
    let parts = [];

    if (isPlatformBrowser(this.platformId) && production) {
      location = window.location.origin;
    }

    let url = location.split('://')[1];

    if (url) {
      parts = url.split('.');
      subdomain = (parts.length === 3) ? parts[0] : null;
    }

    if (subdomain && subdomain !== 'www') {
      this.router.navigate(['portfolio/' + subdomain], { skipLocationChange: true });
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }
}
