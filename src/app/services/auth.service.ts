import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginDto} from "../dtos/login-dto";
import {TokenDto} from "../dtos/token-dto";
import {CreateAccountDto} from "../dtos/create-account-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.API_URL;

  login(loginDto: LoginDto) :Observable<TokenDto>  {
    return this.http.post<TokenDto>(`${this.baseUrl}authorization/login`, loginDto);
  }

  register(createAccountDto: CreateAccountDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}authorization/register`, createAccountDto);
  }
}
