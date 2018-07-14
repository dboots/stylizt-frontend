export class Location {
  fullAddress: string;
  streetNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  constructor(
    fullAddress = '',
    streetNumber = '',
    street = '',
    city = '',
    state = '',
    country = '',
    postalCode = ''
  ) {
    this.fullAddress = fullAddress;
    this.streetNumber = streetNumber;
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.postalCode = postalCode;
  }

  toString(): string {
    return JSON.stringify({
      fullAddress: this.fullAddress,
      streetNumber: this.streetNumber,
      street: this.street,
      city: this.city,
      state: this.state,
      country: this.country,
      postalCode: this.postalCode
    });
  }
}
