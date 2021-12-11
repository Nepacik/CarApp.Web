import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UserDto} from "../dtos/user-dto";
import {UserCarsDto} from "../dtos/user-cars-dto";
import {PaginationClassDto} from "../dtos/pagination-class-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.API_URL + "user/";

  getAllUsers(page: number) :Observable<PaginationClassDto<UserDto>>  {
    return this.http.get<PaginationClassDto<UserDto>>(`${this.baseUrl}users`, {
      params: {
        page: page
      }
    });
  }

  getUserCars(): Observable<UserCarsDto> {
    return this.http.get<UserCarsDto>(`${this.baseUrl}userCar`)
  }
}
