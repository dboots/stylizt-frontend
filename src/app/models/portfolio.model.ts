import { Talent } from './talent.model';

export class Portfolio {
  _id: string;
  clientId: string;
  image: string;
  caption: string;
  talents: Talent[];
  display: boolean;
  loading: boolean;
  publicId: string;

  constructor(
    image: string,
    caption?: string,
    talents: Talent[] = [],
    display: boolean = true,
    clientId?: string,
    _id?: string

  ) {
    this.clientId = clientId;
    this.image = image;
    this.caption = caption;
    this.talents = talents;
    this.display = display;
    this.loading = false;
    this._id = _id;
  }

  toPayload() {
    return {
      clientId: this.clientId,
      image: this.image,
      caption: this.caption,
      talents: this.talents,
      display: this.display,
    };
  }
}
