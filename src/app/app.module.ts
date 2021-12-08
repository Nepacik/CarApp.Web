import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TestComponent } from './components/test/test.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AuthModule} from "./modules/auth/auth.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
