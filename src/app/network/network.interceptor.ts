import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {catchError, Observable, skipWhile, throwError} from 'rxjs';
import {TokenStorage} from "../infrastructure/storage/token-storage";
import {environment} from "../../environments/environment";
import {TokenDto} from "../dtos/token-dto";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage) {}

  attempts = 0;
  private baseUrl = environment.API_URL;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let accessToken = this.tokenStorage.getAccessToken()
    let headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'ApiKey': '74564336767',
      }
    )
    if(typeof accessToken === "string") {
      headers = headers.append(
        'Authorization', "Bearer " + accessToken
      )
    }
    let req = request.clone({
      headers: headers,
    });

    return next.handle(req).pipe(
      catchError(err => {
        if(err.status === 401 && !(req.url.includes("authorization/login") || req.url.includes("authorization/register"))) {
          if(this.handleAuthError(req, next)) {
            return next.handle(req);
          } else {
            this.tokenStorage.clearTokens();
            return new Observable<HttpEvent<any>>(err);
          }
        }
        return new Observable<HttpEvent<any>>(err);
      })
    )

  }

  private handleAuthError(req: HttpRequest<any>, next: HttpHandler): boolean {

    req = req.clone().body.append('refreshToken', this.tokenStorage.getRefreshToken());
    req = Object.assign(req, `${this.baseUrl}/authorization/refreshtoken`)
    let successRefresh: boolean = false
    while (this.attempts < 3 && !successRefresh) {
      next.handle(req).subscribe((success: HttpEvent<TokenDto>) => {

        let token: TokenDto = JSON.parse(JSON.stringify(success))
        this.tokenStorage.saveTokens(token)
        successRefresh = true;
      }, error => {
        this.attempts += 1;
      })
    }
    return successRefresh;
  }

}
