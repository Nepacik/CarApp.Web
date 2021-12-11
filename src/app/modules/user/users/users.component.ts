import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {
  MyRequest, MyRequestData,
  MyRequestError,
  MyRequestLoading
} from "../../../infrastructure/my-request/my-request";
import {PaginationClassDto} from "../../../dtos/pagination-class-dto";
import {UserDto} from "../../../dtos/user-dto";
import {delay} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsersRequest: MyRequest<PaginationClassDto<UserDto>>;

  currentPage: number = 1

  constructor(private userService: UserService, private router:Router) {
    this.allUsersRequest = new MyRequestLoading;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(option:number = 0) {
    this.allUsersRequest = new MyRequestLoading;
    this.userService.getAllUsers(this.currentPage + option).subscribe(
      {
        next: next => {
          this.allUsersRequest = new MyRequestData(next);
          this.currentPage = this.allUsersRequest.data?.page!
        },
        error: err => {
          this.allUsersRequest = new MyRequestError("Failed to fetch data");
        }
      }
    )
  }

  redirectoToDetails() {
    this.router.navigateByUrl("users/user-details")
  }


}
