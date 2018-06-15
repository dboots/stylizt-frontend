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
    notes: 'Sample post with photo. Lorem pellab ipsus et resciliquo magnia corent rest evellore, optaturi opti sed untio. Ossume venimint aligentet expliquam conse volector reperia alit pliquas quo. Minvent. Itatqui buscium idusam id eatet explign issinvente re velibeat acipsanihit peritat endellisit mi, sit que nia etumquam, odipisq uissum ea qui denditas as inum quidunt ionsed quae.',
    postDate: new Date(),
    isPublic: true,
    images: [
      'http://res.cloudinary.com/drcvakvh3/image/upload/w_400/client_notes/sxepnokefcaldblkeudl.jpg',
      'http://res.cloudinary.com/drcvakvh3/image/upload/v1527797446/client_notes/xh8prmhc6clgwqmgsw7l.jpg'
    ]
  },
  {
    id: '2',
    clientId: '5af9ae0b8ec7176f33497a42',
    notes: 'Sample post without photo ipsus et resciliquo magnia corent rest evellore, optaturi opti sed untio. Ossume venimint aligentet expliquam conse volector reperia alit pliquas quo. Minvent. Itatqui buscium idusam id eatet explign issinvente re velibeat acipsanihit peritat endellisit mi, sit que nia etumquam, odipisq uissum ea qui denditas as inum quidunt ionsed quae cullecu.',
    postDate: new Date(),
    isPublic: false
  }
];
