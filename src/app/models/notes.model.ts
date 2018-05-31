export class Notes {
  id: string;
  clientId: string;
  notes: string;
  postDate: Date;
  isPublic: boolean;
  images?: string[];

  constructor(
    clientId: string,
    notes: string,
    postDate: Date,
    isPublic: boolean,
    images?: string[]
  ) {
    this.clientId = clientId;
    this.notes = notes;
    this.postDate = postDate;
    this.isPublic = isPublic;
    this.images = images;
  }
}

export const NotesMockData: Notes[] = [
  {
    id: '1',
    clientId: '5af9ae0b8ec7176f33497a42',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eupharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quamnec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velitodio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut',
    postDate: new Date(),
    isPublic: true,
    images: [
      'http://res.cloudinary.com/drcvakvh3/image/upload/v1527797446/client_notes/tklzi0lrawlr0gxjofeg.png',
      'http://res.cloudinary.com/drcvakvh3/image/upload/v1527797446/client_notes/xh8prmhc6clgwqmgsw7l.jpg'
    ]
  },
  {
    id: '2',
    clientId: '5af9ae0b8ec7176f33497a42',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis acneque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortormauris molestie elit, et lacinia ipsum quam nec dui.',
    postDate: new Date(),
    isPublic: false
  }
];
