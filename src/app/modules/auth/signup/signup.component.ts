import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {LoginDto} from "../../../dtos/login-dto";
import {CreateAccountDto} from "../../../dtos/create-account-dto";
import {MustMatch} from "../../../infrastructure/helpers/must-match";
import {Router} from "@angular/router";
import {ToastUtil} from "../../../infrastructure/helpers/toast-util";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss',  '../auth-module.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({
      loginControll: new FormControl('', [Validators.required, Validators.minLength(5)]),
      emailControll: new FormControl('', [Validators.required, Validators.email,]),
      passwordControll: new FormControl('', [Validators.required, Validators.minLength(5)]),
      repeatPasswordControll: new FormControl('', [Validators.required, Validators.minLength(5)]),
    },
  );

  login: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private toastUtil: ToastUtil) { }

  ngOnInit(): void {
  }

  attemptToRegister() {

    console.log(this.registerForm);
    if(this.password != this.repeatPassword) {

      return;
    }
    let createAccountDto: CreateAccountDto = {nick: this.login, password: this.password, email: this.email};
    this.authService.register(createAccountDto).subscribe(res => {
        this.router.navigateByUrl('/', {skipLocationChange: false,}).then(() => {
          window.location.reload();
        });
    },
      error => {
      this.toastUtil.showError("Failed to register")
      })
  }

}
