import { Talent } from './talent.model';

export class User {
  _id: string;
  name: string;
  email: string;
  zip: string;
  bio: string;
  type: string;
  password: string;
  plan: number;
  image: string;
  talents: Talent[];
}
