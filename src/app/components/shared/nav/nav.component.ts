import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';

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
  isStylist: boolean;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes('/stylist')) {
          this.isStylist = true;
        } else {
          this.isStylist = false;
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  track(event) {
    if (window.pageYOffset > 500) {
      this.isFullNav = false;
    } else {
      this.isFullNav = true;
    }
  }

  ngOnInit() {
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
        this.router.navigate(['stylist/profile']);
      }, (error) => {
        this.message = 'Invalid login, please try again.';
        return Observable.throw(error);
      }
    );
  }

}
