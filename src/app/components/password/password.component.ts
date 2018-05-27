import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService, UserService } from '../../services';

function matchPassword(ac: AbstractControl) {
  const passwordConfirm = ac.get('passwordConfirm');
  const passwordNew = ac.get('passwordNew');
  if (passwordConfirm.value !== passwordNew.value) {
    return {
      passwordConfirm: {
        match: false
      }
    };
  }

  return null;
}

@Component({
  selector: 'app-page-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordPageComponent implements OnInit {
  passwordForm: FormGroup;
  passwordNew: FormControl;
  passwordConfirm: FormControl;
  token: string;
  message: string;
  success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.route.params.subscribe( (params) => {
      this.token = params.token;
    });
  }

  ngOnInit() {
    this.passwordNew = new FormControl('', [Validators.minLength(8), Validators.required]);
    this.passwordConfirm = new FormControl('', [Validators.minLength(8), Validators.required]);

    this.passwordForm = new FormGroup({
      passwordNew: this.passwordNew,
      passwordConfirm: this.passwordConfirm
    }, matchPassword);
  }

  setPassword() {
    if (this.passwordForm.valid) {
      const body = {
        token: this.token,
        password: this.passwordConfirm.value
      };

      this.userService.resetPassword(body).subscribe((result) => {
        this.authService.token = result['token'];
        this.message = 'Your password has been reset!';
        this.success = true;
      }, (err) => {
        console.log('err', err);
      });
    }
  }
}
