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
  model = new Signup();
  
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
    console.log('login');
    console.log(this.model);
    this.signupService.login(this.model).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }
  
}
