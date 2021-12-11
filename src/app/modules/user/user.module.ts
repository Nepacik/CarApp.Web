import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserCarsComponent } from './user-cars/user-cars.component';
import {UserRoutingModule} from "./user-routing-module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    UsersComponent,
    UserCarsComponent,
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
    ]
})
export class UserModule { }
