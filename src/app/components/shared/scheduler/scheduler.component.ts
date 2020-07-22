import { Component, OnInit, Input, OnChanges, SimpleChanges, Renderer2, Inject, OnDestroy, AfterContentInit, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Schedule, Service } from 'src/app/models';
import { ScheduleService } from 'src/app/services';
import { Time } from 'src/app/models/time.model';
import { User } from 'src/app/models/user.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, OnChanges {
  @Input() stylist: User;
  @Input() service: Service;

  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  selectedDate: Date;
  week: Date[] = [];
  currentDate: Date = new Date();
  selectedSchedule: Schedule = new Schedule();
  scheduledTimes: string[] = [];
  availableTimes: Time[] = [];
  morningTimes: Time[] = [];
  afternoonTimes: Time[] = [];
  eveningTimes: Time[] = [];
  step: number = 1;

  constructor(
    private scheduleService: ScheduleService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const currentDate = new Date(this.currentDate);
    let week = [new Date(currentDate)];

    for (let i = 0; i < 6; i++) {
      week.push(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    }

    this.week = week;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.service.currentValue) {
      const service: Service = changes.service.currentValue;
      const currentDate = this.currentDate;
      let selectedSchedule = new Schedule();

      selectedSchedule.service = service;

      this.selectedSchedule = selectedSchedule;
      this.selectServiceDate(currentDate, true);
      this.renderer.addClass(this.document.body, 'modal-open');
    }
  }

  getMonth(day: Date, index: number): string {
    if (index === 0) {
      return this.months[day.getMonth()];
    } else if (day.getMonth() !== this.week[index - 1].getMonth()) {
      return this.months[day.getMonth()];
    }
  }

  isActiveDate(day: Date): boolean {
    const selected = this.selectedDate;
    return selected && day.getDate() === selected.getDate() &&
      day.getMonth() === selected.getMonth() &&
      day.getFullYear() === selected.getFullYear();
  }

  isCurrentDate(day: Date): boolean {
    const today = new Date();
    return day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();
  }

  getTimeString(date: Date, returnFormatted: boolean) {
    let minutes = date.getMinutes().toString();
    let hours = date.getHours();
    let formattedHours = ((hours > 12) ? (hours % 12) : hours).toString();

    if (!returnFormatted) {
      formattedHours = hours.toString();
    }

    if (formattedHours.length === 1) {
      formattedHours = '0' + formattedHours;
    }

    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    return formattedHours + ':' + minutes;
  }

  parseSchedule(schedule: Schedule[]) {
    let scheduledTimes = [];
    schedule.map((slot) => {
      let scheduledStartTime = new Date(slot.startDateTime);
      let scheduledEndTime = new Date(slot.endDateTime);
      while (scheduledStartTime < scheduledEndTime) {
        scheduledTimes.push(this.getTimeString(scheduledStartTime, false));
        scheduledStartTime.setMinutes(scheduledStartTime.getMinutes() + 30);
      }
    });

    this.scheduledTimes = scheduledTimes;
  }

  selectTime(time: Time) {
    let endDateTime = new Date(time.date);
    const service = this.service;

    this.morningTimes.map((t) => t.selected = false);
    this.afternoonTimes.map((t) => t.selected = false);
    this.eveningTimes.map((t) => t.selected = false);

    endDateTime.setTime(time.date.getTime() + ((service.time * 30) * 60 * 1000));
    time.selected = !time.selected;
    this.selectedSchedule.startDateTime = time.date;
    this.selectedSchedule.endDateTime = endDateTime;

    console.log(this.selectedSchedule);
  }

  selectServiceDate(day: Date, isDisplayOnly: boolean = false) {
    const stylist = this.stylist;
    const service: Service = this.service;
    let availableTimes: Time[] = [];
    let startDateTime: Date = new Date(day);
    let endDateTime: Date = new Date(day);
    let morningTimes = this.morningTimes;
    let afternoonTimes = this.afternoonTimes;
    let eveningTimes = this.eveningTimes;

    startDateTime.setHours(9);
    startDateTime.setMinutes(0);
    endDateTime.setHours(startDateTime.getHours() + 11);

    if (!isDisplayOnly) {
      this.selectedSchedule.startDateTime = new Date(startDateTime);
    }
    morningTimes = [];
    afternoonTimes = [];
    eveningTimes = [];

    this.scheduleService.read(stylist._id, day.getTime()).subscribe((result) => {
      this.parseSchedule(result);

      while (startDateTime < endDateTime) {
        let timeString = this.getTimeString(startDateTime, false);
        let formattedTimeString = this.getTimeString(startDateTime, true);
        let active = (this.scheduledTimes.indexOf(timeString) === -1) && (startDateTime > this.currentDate);

        let checkDateTime = new Date(startDateTime);
        let timeDate = new Date(startDateTime);
        let checkTimeString = this.getTimeString(checkDateTime, false);

        timeDate.setHours(startDateTime.getHours());
        timeDate.setMinutes(startDateTime.getMinutes());

        if (active) {
          for (let i = 1; i < service.time; i++) {
            checkTimeString = this.getTimeString(checkDateTime, false);
            let checkTimeIndex = this.scheduledTimes.indexOf(checkTimeString);
            console.log(checkTimeString, this.scheduledTimes, checkTimeString);
            active = (checkTimeIndex === -1);

            checkDateTime.setMinutes(checkDateTime.getMinutes() + 30);

            if (!active) {
              break;
            }
          }
        }

        availableTimes.push(new Time(timeString, formattedTimeString, active, timeDate));
        startDateTime.setMinutes(startDateTime.getMinutes() + 30);
      }

      availableTimes.map((time, index) => {
        if ((index + service.time) > (availableTimes.length)) {
          time.available = false;
        }

        if (time.date.getHours() <= 11) {
          morningTimes.push(time);
        }

        if (time.date.getHours() >= 12 && time.date.getHours() <= 17) {
          afternoonTimes.push(time);
        }

        if (time.date.getHours() >= 18) {
          eveningTimes.push(time);
        }
      });

      this.availableTimes = availableTimes;
      this.selectedDate = day;
      this.morningTimes = morningTimes;
      this.afternoonTimes = afternoonTimes;
      this.eveningTimes = eveningTimes;
    });
  }

  next(): void {
    let week = this.week;
    let nextDate: Date = new Date(week[week.length - 1]);

    week = [];

    for (let i = 0; i < 7; i++) {
      week.push(new Date(nextDate.setDate(nextDate.getDate() + 1)));
    }

    this.week = week;
  }

  prev(): void {
    let week = this.week;
    let nextDate: Date = new Date(week[0].setDate(week[0].getDate() - 8));

    week = [];

    for (let i = 0; i < 7; i++) {
      week.push(new Date(nextDate.setDate(nextDate.getDate() + 1)));
    }

    this.week = week;
  }

  cancel() {
    this.service = null;
    this.renderer.removeClass(this.document.body, 'modal-open');
  }

  book() {
    const body = this.selectedSchedule;
    body.owner = this.stylist._id;
    this.scheduleService.create(body).subscribe((result) => {
      this.step = 3;
    });
  }
}
