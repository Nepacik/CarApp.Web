import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModelComponent } from './add-model/add-model.component';
import {AdminRoutingModule} from "./admin-routing-module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddModelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
