import { Service } from './service.model';

export class Schedule {
  _id: string;
  startDateTime: Date;
  endDateTime: Date;
  description: string;
  name: string;
  phone: string;
  owner: string;
  service: Service;
  datePicker: any;
}
