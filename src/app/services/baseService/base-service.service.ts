import { Injectable } from '@angular/core';
import {TokenDto} from "../../dtos/token-dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  call<T>(url:string, body: T | null) {
    let response = this.http.post<T>(`${this.baseUrl}${url}`, body);

    return this.http.post<TokenDto>(`${this.baseUrl}${url}`, body);

  }
}
