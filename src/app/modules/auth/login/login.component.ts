import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth-module.scss']
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';

  constructor() { }

  ngOnInit(): void {
  }

  attemptToLogin() {
    console.log(this.login);
  }

}
