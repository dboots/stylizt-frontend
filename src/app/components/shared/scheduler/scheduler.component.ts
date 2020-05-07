import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  selectedDate: Date;
  week: Date[] = [];
  currentDate: Date = new Date();
  constructor() { }

  ngOnInit() {
    const currentDate = new Date(this.currentDate);
    let week = [new Date(currentDate)];

    for (let i = 0; i < 6; i++) {
      week.push(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    }

    this.week = week;
  }

  getMonth(day: Date, index: number): string {
    if (index === 0) {
      return this.months[day.getMonth()];
    } else if (day.getMonth() !== this.week[index - 1].getMonth()) {
      return this.months[day.getMonth()];
    }
  }

  selectDate(day: Date): void {
    this.selectedDate = day;
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
}
