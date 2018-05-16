import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

function matchPassword(ac: AbstractControl) {
  let password_confirm = ac.get('password_confirm');
  let password_new = ac.get('password_new');
  if (password_confirm.value != password_new.value) {
    return {
      password_confirm: {
        match: false
      }
    }
  }

  return null;
}

@Component({
  selector: 'page-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordPage implements OnInit {
  passwordForm: FormGroup;
  password_new: FormControl;
  password_confirm: FormControl;
  token: string;
  message: string;
  success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.route.params.subscribe( params => {
      this.token = params.token;
    });
  }

  ngOnInit() {
    this.password_new = new FormControl('', [Validators.minLength(8), Validators.required]),
    this.password_confirm = new FormControl('', [Validators.minLength(8), Validators.required])
    
    this.passwordForm = new FormGroup({
      password_new: this.password_new,
      password_confirm: this.password_confirm
    }, matchPassword);
  }

  setPassword(){
    if (this.passwordForm.valid) {
      let body = {
        token: this.token,
        password: this.password_confirm.value
      }

      this.userService.resetPassword(body).subscribe((result) => {
        this.authService.token = result['token'];
        this.message = 'Your password has been reset!'
        this.success = true;
      }, (err) => {
        console.log('err', err);
      });
    }
  }
}