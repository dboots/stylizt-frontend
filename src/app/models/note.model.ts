export class Note {
  _id: string;
  clientId: string;
  body: string;
  dateCreated: Date;
  isPublic: boolean;
  images?: string[];
  owner: string;

  constructor() {}
}
