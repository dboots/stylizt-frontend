import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SignupService } from '../../../services/signup.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
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
  
  constructor(
    private modalService: NgbModal,
    private signupService: SignupService,
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
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  doLogin() {
    this.signupService.login(this.model).subscribe(
      data => {
        this.message = '';
        this.modalRef.close();
        localStorage.setItem('token', data['token']);
        this.router.navigate(['stylist/profile']);
      }, error => {
        this.message = 'Invalid login, please try again.';
        return Observable.throw(error);
      }
    );
  }
  
}
