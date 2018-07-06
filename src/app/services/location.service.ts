import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {
  currentLocation: string;

  constructor(private http: HttpClient) {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const res: any = await this.http.get('//maps.googleapis.com/maps/api/geocode/json',
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
}
