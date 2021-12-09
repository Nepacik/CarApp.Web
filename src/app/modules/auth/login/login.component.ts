import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {LoginDto} from "../../../dtos/login-dto";
import {TokenStorage} from "../../../infrastructure/storage/token-storage";
import {Router} from "@angular/router";
import {ToastUtil} from "../../../infrastructure/helpers/toast-util";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth-module.scss']
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorage, private router: Router, private toastUtil: ToastUtil) {
  }

  ngOnInit(): void {
  }

  attemptToLogin() {
    let loginDto: LoginDto = {login: this.login, password: this.password};

    this.authService.login(loginDto).subscribe(
      {
        next: next => {
          this.tokenStorage.saveTokens(next);
          this.router.navigateByUrl('/', {skipLocationChange: false,}).then(() => {
            window.location.reload();
          });
        },
        error: err => {
          console.log(err.status);
          this.toastUtil.showError("Failed to login")
        }
      }
    )
  }

}
