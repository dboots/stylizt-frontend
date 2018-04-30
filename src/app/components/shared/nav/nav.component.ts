import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SignupService } from '../../../services/signup.service';
import { Signup } from '../../../models/signup.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: Signup = new Signup();
  message: string = '';
  
  constructor(
    private modalService: NgbModal,
    private signupService: SignupService
  ) { }
  
  ngOnInit() {
  }
  
  modal(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }
  
  doSignup() {
    console.log('signup');
    console.log(this.model);
    this.signupService.signup(this.model).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }
  
  doLogin() {
    this.signupService.login(this.model).subscribe(
      data => {
        this.message = '';
        return true;
      },
      error => {
        this.message = 'Invalid login, please try again.';
        return Observable.throw(error);
      }
    );
  }
  
}
