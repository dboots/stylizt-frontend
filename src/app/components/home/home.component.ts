import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  dropdownOptions: any[];
  currentOption;
  currentLocation: string;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.dropdownOptions = ['DO IT ALL', 'BANGS', 'UPDOS', 'WEAVES'];
    this.currentOption = 'DO IT ALL';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const res: any = await this.http.get('http://maps.googleapis.com/maps/api/geocode/json',
            {
              params: {
                latlng: pos.coords.latitude + ',' + pos.coords.longitude
              }
            }
          ).toPromise();
          this.currentLocation = res.results[0].formatted_address || '';
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  selectDropdown(option: any) {
    this.currentOption = option;
  }
}
