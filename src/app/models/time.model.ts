export class Time {
  selected: boolean = false;

  constructor(private time: string, public formattedTime: string, public available: boolean = true, public date?: Date) {
    console.log(this.date);
  }
}
