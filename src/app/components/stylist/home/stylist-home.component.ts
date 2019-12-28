import { Component, OnInit } from '@angular/core';
import { AuthService, ScheduleService } from '../../../services';
import { User, Schedule } from '../../../models';

@Component({
  selector: 'app-page-stylist-home',
  templateUrl: './stylist-home.component.html',
  styleUrls: ['./stylist-home.component.scss']
})
export class StylistHomePageComponent implements OnInit {
  user: User;
  schedule: Schedule[] = [];
  scheduleDay: Date = new Date();

  constructor(private authService: AuthService, private scheduleService: ScheduleService) {
    this.scheduleDay.setHours(9);
    this.scheduleDay.setMinutes(0);

    this.user = this.authService.decode();
    this.loadSchedule();
  }

  loadSchedule() {
    this.scheduleService.read(this.user._id, this.scheduleDay.getTime()).subscribe((result) => {
      this.schedule = result['data'];
    });
  }

  nextScheduleDay() {
    let date = new Date(this.scheduleDay);
    date.setHours(date.getHours() + 24);

    this.scheduleDay = date;
    this.loadSchedule();
  }

  confirm(event: Schedule, index: number, approved: boolean) {
    event.approved = approved;
    this.scheduleService.update(event).subscribe((result) => {
      this.schedule[index] = result['data'];
    });
  }

  prevScheduleDay() {
    let date = new Date(this.scheduleDay);
    date.setHours(date.getHours() - 24);

    this.scheduleDay = date;
    this.loadSchedule();
  }

  ngOnInit() { }
}
