export class Post {
  title: string;
  content: string;
  date: Date;
  image: string;
  link: string;

  constructor(
    title: string,
    content: string,
    date: Date,
    image: string,
    link: string
  ) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.image = image;
    this.link = link;
  }
}
