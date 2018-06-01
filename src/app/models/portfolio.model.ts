export class Portfolio {
  id: string;
  clientId: string;
  image: string;
  caption: string;

  constructor(
    clientId: string,
    image: string,
    caption: string
  ) {
    this.clientId = clientId;
    this.image = image;
    this.caption = caption;
  }
}
