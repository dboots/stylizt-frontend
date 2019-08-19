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

  constructor(private authService: AuthService, private scheduleService: ScheduleService) {
    let today = new Date();
    today.setHours(9);
    today.setMinutes(0);

    this.user = this.authService.decode();
    this.scheduleService.read(this.user._id, today.getTime()).subscribe((result) => {
      console.log(result);
      this.schedule = result['data'];
    });
  }

  ngOnInit() { }
}
