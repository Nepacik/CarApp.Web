import { Component, OnInit } from '@angular/core';
import {TokenStorage} from "../../infrastructure/storage/token-storage";
import {UserInfo} from "../../models/user-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo: UserInfo;
  isLoggedIn: boolean;
  role:string;

  constructor(private tokenStorage:TokenStorage, private router: Router) {
    this.userInfo = tokenStorage.getUserInfo();
    this.role = this.userInfo.getRole();
    this.isLoggedIn = this.userInfo.isLogged();
    console.log(this.userInfo);
  }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorage.clearTokens();
  }
}
