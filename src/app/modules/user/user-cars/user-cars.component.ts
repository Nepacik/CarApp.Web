import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {
  MyRequest,
  MyRequestData,
  MyRequestError,
  MyRequestLoading
} from "../../../infrastructure/my-request/my-request";
import {UserCarsDto} from "../../../dtos/user-cars-dto";

@Component({
  selector: 'app-user-cars',
  templateUrl: './user-cars.component.html',
  styleUrls: ['./user-cars.component.scss']
})
export class UserCarsComponent implements OnInit {

  response: MyRequest<UserCarsDto>;

  constructor(private userService:UserService) {
    this.response = new MyRequestLoading;
  }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this.userService.getUserCars(1).subscribe(
      {
        next: next => {
          this.response = new MyRequestData(next);
        },
        error: err => {
          this.response = new MyRequestError("Failed to fetch data");
        }
      }
    )
  }

}
