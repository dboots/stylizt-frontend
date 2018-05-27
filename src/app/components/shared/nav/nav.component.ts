import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';
import { Router } from '@angular/router';

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

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

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
