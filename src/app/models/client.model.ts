import { Portfolio } from './portfolio.model';

export class Client {
  name: string;
  email: string;
  phone: string;
  zip: string;
  _id?: string;
  portfolio?: Portfolio[] = [];

  constructor(
    name: string,
    email: string,
    _id?: string
  ) {
    this.name = name;
    this.email = email;
    this._id = _id;
  }
}
