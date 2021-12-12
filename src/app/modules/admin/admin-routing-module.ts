import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddModelComponent} from "./add-model/add-model.component";

const routes: Routes = [
  {path: 'admin/add-model', component: AddModelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
