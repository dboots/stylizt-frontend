import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, ScheduleService } from '../../../services';
import { User, Schedule } from '../../../models';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-stylist-home',
  templateUrl: './stylist-home.component.html',
  styleUrls: ['./stylist-home.component.scss']
})
export class StylistHomePageComponent implements OnInit, OnDestroy {
  user: User;
  schedule: Schedule[] = [];
  scheduleDay: Date = new Date();
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  daysInWeek = 4;
  private destroy$ = new Subject();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  linkCopied: boolean = false;

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef) {
    this.scheduleDay.setHours(9);
    this.scheduleDay.setMinutes(0);

    this.user = this.authService.decode();
    this.loadSchedule();
  }

  copyLink() {
    this.linkCopied = true;
  }

  loadSchedule() {
    const events = this.events;
    this.scheduleService.read(this.user._id, this.scheduleDay.getTime()).subscribe((result) => {
      result.map((appt) => {
        events.push({
          start: new Date(Date.parse(appt.startDateTime.toString())),
          end: new Date(Date.parse(appt.endDateTime.toString())),
          title: `${appt.service.name} with ${appt.name}`,
        });
      });

      this.events = events;
      this.refresh.next();
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

  ngOnInit() {
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 4;
        }
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
