import { Talent } from './talent.model';

export class User {
  _id: string = '';
  name: string = '';
  email: string = '';
  zip: string = '';
  city: string = '';
  state: string = '';
  bio: string = '';
  type: string = '';
  password: string = '';
  plan: number = 0;
  image: string = '';
  talents: Talent[] = [];
  stripeId: string = '';
  url: string = '';
  facebook: string = '';
  twitter: string = '';
  instagram: string = '';
}
