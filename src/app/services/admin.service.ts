import { Injectable } from '@angular/core';
import {delay, from, interval, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Brand} from "../dtos/brand";
import {ModelCreateDto} from "../dtos/model-create-dto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.API_URL + "admin/";

  addModel(id: number, name: string): Observable<any> {
    let modelDto : ModelCreateDto = {
      name: name,
      brandId: id
    };
    return this.http.post(`${this.baseUrl}createModel`, modelDto)
  }

  async getBrands(prefix: string): Promise<Array<Brand>> {
    let brands: { id: number, name: string }[] = [
      { "id": 0, "name": "Toyota" },
      { "id": 1, "name": "Ready" },
      { "id": 2, "name": "Started" },
      { "id": 2, "name": "safasf" },
      { "id": 3, "name": "to" },
      { "id": 4, "name": "hahahhaha" },
      { "id": 5, "name": "jrsgtag" },
      { "id": 6, "name": "liusaaaaaa" },
      { "id": 7, "name": "fafafafa" },
      { "id": 8, "name": "haa" },
    ];
    brands = brands.filter(value => {
      return value.name.toLocaleLowerCase().startsWith(prefix.toLocaleLowerCase());
    });

    return new Promise(resolve =>
      setTimeout(() => resolve(brands), 0)
    );
  }
}
