import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TestComponent } from './components/test/test.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AuthModule} from "./modules/auth/auth.module";
import {RouterModule} from "@angular/router";
import {NetworkInterceptor} from "./network/network.interceptor";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {UserModule} from "./modules/user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
    UserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
