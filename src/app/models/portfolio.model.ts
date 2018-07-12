import { Talent } from './talent.model';

export class Portfolio {
  _id: string;
  clientId: string;
  image: string;
  caption: string;
  talents: Talent[];
  display: boolean;

  constructor(
    clientId: string,
    image: string,
    caption: string,
    talents: Talent[],
    display: boolean
  ) {
    this.clientId = clientId;
    this.image = image;
    this.caption = caption;
    this.talents = talents;
    this.display = display;
  }
}
