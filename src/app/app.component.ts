import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router) {}
    
    ngOnInit() {
      let production = environment.production;
      let url = window.location.origin.split('://')[1];

      let parts = url.split('.');
      let subdomain = (parts.length == 3) ? parts[0] : null;

      console.log(production, url, parts, subdomain);
      
      if (subdomain && subdomain != 'www') {
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
  