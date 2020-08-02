import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, AfterContentInit, AfterViewInit } from '@angular/core';
import { PortfolioService, AuthService, TalentService, ServicesService, ScheduleService, ContactService } from '../../services';
import { Portfolio, User, Talent, Service, Schedule } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Lengths } from '../../models/length.model';
import { Time } from '../../models/time.model';
import { SeoService } from 'src/app/services/seo.service';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-page-stylistportfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class StylistPortfolioPageComponent {
  portfolio: Portfolio[];
  stylist: User;
  params;
  mapUrl: SafeResourceUrl;
  modalRef: NgbModalRef;
  portfolioItem: Portfolio = new Portfolio('');
  talents: Talent[] = [];
  services: Service[] = [];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  instagram: string = null;
  twitter: string = null;
  facebook: string = null;
  portfolioActionLabel = 'Add To Portfolio';
  portfolioTitle = 'Add To Portfolio';

  availableTimes: Time[] = [];
  lengths: string[] = Lengths.lengths;
  scheduledTimes: string[] = [];
  showDatePicker: boolean = false;
  selectedSchedule: Schedule = new Schedule();
  showBookButton: boolean = false;
  currentDate: Date = new Date();
  minDate: any = {};
  message: string;
  service: Service;
  scrollClass: boolean = false;
  contactVisible: boolean = false;
  contactForm: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'message': new FormControl('', [Validators.required]),
    'from': new FormControl('')
  });
  contactFormSubmitted: boolean = false;

  @ViewChild('aboutViewChild') aboutElementRef: ElementRef;
  @ViewChild('servicesViewChild') servicesElementRef: ElementRef;
  @ViewChild('contactViewChild') contactElementRef: ElementRef;

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private router: Router,
    private sanitization: DomSanitizer,
    private servicesService: ServicesService,
    private scheduleService: ScheduleService,
    private seoService: SeoService,
    private contactService: ContactService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;
    });

    this.minDate = {
      year: this.currentDate.getFullYear(),
      month: (this.currentDate.getMonth() + 1),
      day: this.currentDate.getDate()
    };

    this.portfolioService
      .read({ url: this.params.id })
      .subscribe((data: Site) => {
        if (!data.stylist) {
          this.router.navigate(['/']);
        }

        let portfolio = data.portfolio;
        let stylist: User = data.stylist;

        this.servicesService.read(stylist._id).subscribe((result) => {
          this.services = result;
        });

        this.seoService.createCanonicalUrl();
        this.seoService.updateMetaTags(stylist.name + ' Portfolio', null, stylist.name + ' is a stylist from ' + stylist.zip);
        if (stylist && stylist.name && stylist.zip) {
          let location = stylist.zip.replace('#', '%23');
          let url =
            'https://maps.google.com/maps?width=100%&height=600&hl=en&q=' +
            encodeURI(location) +
            '&ie=UTF8&t=&z=14&iwloc=B&output=embed';
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }

        this.twitter = stylist.twitter
          ? this.getUrl(stylist.twitter, 'http://www.twitter.com/')
          : null;
        this.facebook = stylist.facebook
          ? this.getUrl(stylist.facebook, 'http://www.facebook.com/')
          : null;
        this.instagram = stylist.instagram
          ? this.getUrl(stylist.instagram, 'http://www.instagram.com/')
          : null;

        this.contactForm.controls['from'].setValue(stylist.email);

        this.portfolio = portfolio;
        this.stylist = stylist;
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scrollClass = this.scrollClass;
    if (document.body.scrollTop > 66 || document.documentElement.scrollTop > 66) {
      scrollClass = true;
    } else {
      scrollClass = false;
    }

    this.scrollClass = scrollClass;
  }

  book(service: Service) {
    this.service = service;
  }

  parseSchedule(schedule: Schedule[]) {
    this.scheduledTimes = [];
    schedule.map((slot) => {
      let scheduledStartTime = new Date(slot.startDateTime);
      let scheduledEndTime = new Date(slot.endDateTime);
      while (scheduledStartTime < scheduledEndTime) {
        this.scheduledTimes.push(this.getTimeString(scheduledStartTime, false));
        scheduledStartTime.setMinutes(scheduledStartTime.getMinutes() + 30);
      }
    });
  }

  scrollTo(elementRef: ElementRef) {
    elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  bookService(service: Service) {
    let schedule = this.selectedSchedule;
    schedule.description = schedule.service.name;
    schedule.owner = this.stylist._id;
    this.scheduleService.create(schedule).subscribe((result) => {
      this.selectedSchedule = new Schedule();
      this.message = 'Your appointment is booked!';
    });
  }

  clearBooking() {
    this.selectedSchedule.startDateTime = null;
    this.selectedSchedule.endDateTime = null;
    this.selectedSchedule.datePicker = null;
    this.availableTimes = [];
    this.message = '';
  }

  selectServiceDate($event) {
    this.availableTimes = [];
    let dateString = $event.month + '/' + $event.day + '/' + $event.year;
    let startDateTime = new Date(dateString);
    let endDateTime = new Date(dateString);
    let schedule = this.selectedSchedule;
    let service = schedule.service;
    startDateTime.setHours(9);
    startDateTime.setMinutes(0);
    endDateTime.setHours(startDateTime.getHours() + 8);

    this.selectedSchedule.startDateTime = new Date(dateString);

    this.scheduleService.read(this.stylist._id, startDateTime.getTime()).subscribe((result) => {
      this.parseSchedule(result);

      while (startDateTime < endDateTime) {
        let timeString = this.getTimeString(startDateTime, false);
        let formattedTimeString = this.getTimeString(startDateTime, true);
        let active = (this.scheduledTimes.indexOf(timeString) === -1) && (startDateTime > this.currentDate);

        let checkDateTime = new Date(startDateTime);
        let checkTimeString = this.getTimeString(checkDateTime, false);
        console.log(checkTimeString);

        if (active) {
          for (let i = 1; i < service.time; i++) {
            checkTimeString = this.getTimeString(checkDateTime, false);
            let checkTimeIndex = this.scheduledTimes.indexOf(checkTimeString);
            active = (checkTimeIndex === -1);

            checkDateTime.setMinutes(checkDateTime.getMinutes() + 30);

            if (!active) {
              break;
            }
          }
        }

        startDateTime.setMinutes(startDateTime.getMinutes() + 30);

        this.availableTimes.push(new Time(timeString, formattedTimeString, active));
      }

      this.availableTimes.map((time, index) => {
        if ((index + service.time) > this.availableTimes.length) {
          time.available = false;
        }
      });

      this.showDatePicker = false;
      this.showBookButton = false;
    });
  }

  selectServiceTime($event) {
    let schedule = this.selectedSchedule;
    let service = schedule.service;
    let time = $event.target.value;
    let timeParts = time.split(':');
    let hour = timeParts[0];
    let minute = timeParts[1];

    schedule.startDateTime.setHours(hour);
    schedule.startDateTime.setMinutes(minute);

    schedule.endDateTime = new Date(schedule.startDateTime);
    schedule.endDateTime.setMinutes(schedule.endDateTime.getMinutes() + (30 * service.time));

    this.selectedSchedule = schedule;
    this.showBookButton = true;
  }

  getDateFromTimeString(dateTimeString: string) {
    let date = new Date(dateTimeString);
    return date;
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

  getBackgroundImage() {
    const random = Math.floor(Math.random() * Math.floor(100000));
    return this.sanitization.bypassSecurityTrustStyle(
      'url(https://placeimg.com/320/240/any?' + random
    );
  }

  loggedIn() {
    if (this.authService.isAuthenticated() && this.stylist) {
      return this.stylist._id === this.authService.decode()._id;
    }

    return false;
  }

  imageUploadCompleted($event) {
    this.portfolioItem.image = `http://res.cloudinary.com/drcvakvh3/image/upload/w_400/${
      $event['public_id']
      }.webp`;
  }

  updatePortfolio() {
    this.portfolioService
      .update(this.portfolioItem)
      .subscribe(
        (result: any) => {
          // this.portfolioItem.talents = result.talents;
          this.modalRef.close();
        },
        (err) => {
          this.modalRef.close();
        }
      );
  }

  addToPortfolio() {
    this.portfolioService
      .create(this.portfolioItem)
      .subscribe(
        (result: any) => {
          this.portfolio.push(this.portfolioItem);
          this.modalRef.close();
        },
        (err) => {
          console.log('unable to add to portfolio', err);
        }
      );
  }

  portfolioAction() {
    if (this.portfolioItem._id) {
      this.updatePortfolio();
    } else {
      this.addToPortfolio();
    }
  }

  showModal(modal, item) {
    if (item && item._id) {
      this.portfolioItem = item;
      this.portfolioActionLabel = 'Update Portfolio';
    } else {
      this.portfolioItem = new Portfolio('');
      this.portfolioActionLabel = 'Add to Portfolio';
    }

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  sendMessage() {
    this.contactService.contact(this.contactForm.value).subscribe((result) => {
      this.contactFormSubmitted = true;
    });
  }

  // Process social media url/handles
  // handle could be valid url, username, @username
  // return url should be close to http://www.[social].com/[handle]
  getUrl(handle: string, url: string): string {
    let hasHttp = handle.indexOf('http') > -1;
    let hasHttps = handle.indexOf('https') > -1;
    let hasWww = handle.indexOf('www') > -1;
    let isUrl = hasHttp || hasHttps || hasWww;

    if (!hasHttp && !hasHttps && hasWww) {
      handle = 'https://' + handle;
    }

    if (isUrl) {
      return handle;
    }

    return url + handle.replace('@', '');
  }
}
