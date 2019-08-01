import { Component, OnInit } from '@angular/core';
import { PortfolioService, AuthService, TalentService, ServicesService, ScheduleService } from '../../services';
import { Portfolio, User, Talent, Service, Schedule } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DomSanitizer,
  SafeResourceUrl,
  Meta,
  Title
} from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Lengths } from '../../models/length.model';
import { Time } from '../../models/time.model';

@Component({
  selector: 'app-page-stylistportfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class StylistPortfolioPageComponent implements OnInit {
  portfolio: Portfolio[];
  stylist: User;
  params;
  mapUrl: SafeResourceUrl;
  modalRef: NgbModalRef;
  portfolioItem: Portfolio = new Portfolio('');
  talents: Talent[] = [];
  services: Service[] = [];

  instagram: string = null;
  twitter: string = null;
  facebook: string = null;
  portfolioActionLabel = 'Add To Portfolio';
  portfolioTitle = 'Add To Portfolio';

  availableTimes: Time[] = [];
  lengths: string[] = Lengths.lengths;
  scheduledTimes: string[] = [];

  constructor(
    private talentService: TalentService,
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title,
    private modalService: NgbModal,
    private router: Router,
    private sanitization: DomSanitizer,
    private servicesService: ServicesService,
    private scheduleService: ScheduleService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;
    });

    this.portfolioService
      .read({ url: this.params.id })
      .subscribe((data: any) => {
        if (!data.stylist) {
          this.router.navigate(['/']);
        }

        let portfolio = data.portfolio;
        let stylist: User = data.stylist;

        console.log(stylist);

        this.servicesService.read(stylist._id).subscribe((result) => {
          console.log(result);
          this.services = result['data'];
        });

        this.title.setTitle(stylist.name + ' Portfolio');
        if (stylist && stylist.name && stylist.zip) {
          this.meta.updateTag({
            name: 'description',
            content: stylist.name + ' is a stylist from ' + stylist.zip
          });

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

        this.portfolio = portfolio;
        this.stylist = stylist;
      });
  }

  parseSchedule(schedule: Schedule[]) {
    this.scheduledTimes = [];
    schedule.map((slot) => {
      let scheduledStartTime = new Date(slot.start_datetime);
      let scheduledEndTime = new Date(slot.end_datetime);
      while (scheduledStartTime < scheduledEndTime) {
        this.scheduledTimes.push(this.getTimeString(scheduledStartTime));
        scheduledStartTime.setMinutes(scheduledStartTime.getMinutes() + 30);
      }
    });
  }

  selectServiceDate($event) {
    this.availableTimes = [];
    let dateString = $event.month + '/' + $event.day + '/' + $event.year;
    let startDateTime = new Date(dateString);
    let endDateTime = new Date(dateString);
    startDateTime.setHours(9);
    startDateTime.setMinutes(0);
    endDateTime.setHours(startDateTime.getHours() + 8);

    this.scheduleService.read(dateString).subscribe((result) => {
      this.parseSchedule(result['data']);

      while (startDateTime < endDateTime) {
        let timeString = this.getTimeString(startDateTime);
        startDateTime.setMinutes(startDateTime.getMinutes() + 30);
        this.availableTimes.push(new Time(timeString, (this.scheduledTimes.indexOf(timeString) === -1)));
      }
    });
  }

  getDateFromTimeString(dateTimeString: string) {
    let date = new Date(dateTimeString);
    return date;
  }

  getTimeString(date: Date) {
    let minutes = date.getMinutes().toString();
    let hours = date.getHours();
    let formattedHours = ((hours > 12) ? (hours % 12) : hours).toString();

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
      }.jpg`;
  }

  updatePortfolio() {
    this.portfolioService
      .update(this.portfolioItem, this.authService.token)
      .subscribe(
        (result: any) => {
          // this.portfolioItem.talents = result.data.talents;
          this.modalRef.close();
        },
        (err) => {
          this.modalRef.close();
        }
      );
  }

  addToPortfolio() {
    this.portfolioService
      .create(this.portfolioItem, this.authService.token)
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

  ngOnInit() { }
}
