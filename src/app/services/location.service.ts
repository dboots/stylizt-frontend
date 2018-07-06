import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {
  get currentLocation(): string {
    return localStorage.getItem('currentLocation');
  }

  set currentLocation(val) {
    localStorage.setItem('currentLocation', val);
  }

  constructor(private http: HttpClient) {
    if (!this.currentLocation) {
      this.getCurrentLocation();
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const res: any = await this.http.get('https://maps.googleapis.com/maps/api/geocode/json',
            {
              params: {
                key: 'AIzaSyDCLogJN6E_s1uNso1FDiB90qGFHVOjd9w',
                latlng: pos.coords.latitude + ',' + pos.coords.longitude
              }
            }
          ).toPromise();
          const currentLocation = res.results[0].formatted_address || '';
          if (currentLocation) {
            this.currentLocation = currentLocation;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
