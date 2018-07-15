import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location.model';

@Injectable()
export class LocationService {
  get currentLocation(): Location {
    const currentLocationStr = localStorage.getItem('currentLocation');
    if (currentLocationStr) {
      const obj = JSON.parse(currentLocationStr);
      return new Location(obj.fullAddress, obj.streetNumber, obj.street, obj.city, obj.state, obj.country, obj.postalCode);
    }

    return null;
  }

  set currentLocation(val: Location) {
    localStorage.setItem('currentLocation', val.toString());
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
          const currentLocation = new Location();
          currentLocation.fullAddress = res.results[0].formatted_address;
          if (res.results[0] && res.results[0].address_components) {
            res.results[0].address_components.forEach((x) => {
              if (x.types[0] === 'street_number') {
                currentLocation.streetNumber = x.long_name;
              } else if (x.types[0] === 'route') {
                currentLocation.street = x.long_name;
              } else if (x.types[0] === 'locality') {
                currentLocation.city = x.long_name;
              } else if (x.types[0] === 'postal_code') {
                currentLocation.postalCode = x.long_name;
              } else if (x.types[0] === 'administrative_area_level_1') {
                currentLocation.state = x.long_name;
              } else if (x.types[0] === 'country') {
                currentLocation.country = x.long_name;
              }
            });
          }
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
