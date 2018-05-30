export class Portfolio {
  id: string;
  image: string;
  caption: string;
  clientId: string;

  constructor(
    image: string,
    caption: string,
    clientId: string
  ) {
    this.image = image;
    this.caption = caption;
    this.clientId = clientId;
  }
}
