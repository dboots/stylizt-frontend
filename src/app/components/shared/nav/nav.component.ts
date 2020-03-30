import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivationEnd, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';
import { filter } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() dark: boolean = false;

  model: User = new User();
  modalRef: NgbModalRef;
  message: string = '';
  forgotPassword: boolean = false;
  isFullNav: boolean = true;
  navItems = [
    { name: 'Contact', url: '/contact', scroll: false },
    { name: 'Login' }
  ];
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
    this.router.events.filter((event) => event instanceof NavigationEnd)
      .map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['navItems']) {
            return child.snapshot.data['navItems'];
          } else {
            return null;
          }
        }
        return null;
      }).subscribe((data: any) => {
        this.navItems = (data) ? data : this.navItems;
      });

    this.loggedInUser = (this.authService.isAuthenticated()) ? this.authService.decode() : null;
    console.log(this.loggedInUser);
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
