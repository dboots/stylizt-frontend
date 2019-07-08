import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: User = new User();
  modalRef: NgbModalRef;
  message: string = '';
  forgotPassword: boolean = false;
  isFullNav: boolean = true;
  navItems: any[];

  loggedInUser: User;

  newInnerWidth;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.newInnerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.newInnerWidth = event.target.innerWidth;
  }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.loggedInUser = (this.authService.isAuthenticated()) ? this.authService.decode() : null;
        this.navItems = event.navItems || [
          {name: 'Featured Looks', url: '#featured-looks', scroll: true},
          {name: 'Local Talent', url: '#local-talent', scroll: true},
          {name: 'Contact', url: '/contact', scroll: false},
          {name: 'Login'}
        ];
      });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  modal(content) {
    this.message = '';
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  doResetPassword() {
    if (this.model.email.length > 0) {
      this.userService.forgotPassword(this.model).subscribe((result) => {
        this.message = 'An email has been sent requesting to reset your password';
      }, (err) => {
        this.message = 'Unable to process that request';
      });
    }
  }

  doLogin() {
    this.userService.login(this.model).subscribe(
      (data) => {
        this.message = '';
        this.modalRef.close();
        this.authService.token = data['token'];
        this.router.navigate(['stylist/home']);
      }, (error) => {
        this.message = 'Invalid login, please try again.';
        return Observable.throw(error);
      }
    );
  }

  navigateTo(linkTo) {
    this.router.navigate([linkTo]);
  }
}
