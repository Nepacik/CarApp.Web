import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserCarsComponent} from "./user-cars/user-cars.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: 'users', component: UsersComponent },
  {path: 'users/user-details', component: UserCarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
