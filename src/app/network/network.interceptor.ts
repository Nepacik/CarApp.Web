import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap, take,
  throwError
} from 'rxjs';
import {TokenStorage} from "../infrastructure/storage/token-storage";
import {environment} from "../../environments/environment";
import {TokenDto} from "../dtos/token-dto";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage, private router: Router, private authService: AuthService) {}

  attempts = 0;
  private baseUrl = environment.API_URL;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.addHeaders(request)).pipe(
      catchError(err => {
        if(err instanceof HttpErrorResponse && err.status === 401 && !(request.url.includes("authorization/login") || request.url.includes("authorization/register"))) {
          return this.handleAuthError(request, next)
        }

        return throwError(err);

      })
    )

  }

  private handleAuthError(req: HttpRequest<any>, next: HttpHandler) {
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
    }

    const token = this.tokenStorage.getRefreshToken();

    if(token) {
      return this.authService.refreshToken(token).pipe(
        switchMap((tokenResponse:any) => {
          this.isRefreshing = false;
          let tokenDto :TokenDto = {refreshToken: tokenResponse.refreshToken, accessToken: tokenResponse.accessToken};
          this.tokenStorage.saveTokens(tokenDto)

          this.refreshTokenSubject.next(tokenResponse.accessToken)

          return next.handle(this.addHeaders(req))
        }),
        catchError((err => {
          this.isRefreshing = false;
          this.tokenStorage.clearTokens();
          window.location.reload();
          return throwError(err)
        }))
      )
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addHeaders(req))
      ));
  }

  private addHeaders(request: HttpRequest<any>) {
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
    return request.clone({ headers: headers});
  }
}
