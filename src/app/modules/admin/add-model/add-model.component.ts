import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {Brand} from "../../../dtos/brand";
import {ToastUtil} from "../../../infrastructure/helpers/toast-util";

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {

  selectedBrand: Brand | null = null;

  brandInputText = '';

  brands: Array<Brand> = []

  modelInputText = '';

  constructor(private adminService: AdminService, private toastUtil: ToastUtil) { }

  ngOnInit(): void {
  }

  addModel() {
    this.adminService.addModel(1, this.modelInputText).subscribe({
      next: next => {
        this.toastUtil.showSuccess("successfully addded model");
      },
      error: err => {
        this.toastUtil.showError("failed to add model");
      }
    })
  }

  getBrands() {
    this.selectedBrand = null;
    this.adminService.getBrands(this.brandInputText).then(value => {
      this.brands = value;
    });
  }

  setCurrentBrand(value: Brand) {
    console.log(value + "ahahahhaha");
    this.selectedBrand = value;
    console.log(this.selectedBrand);
  }

}
