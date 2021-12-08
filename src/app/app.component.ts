import { Component } from '@angular/core';
import {translate} from "@angular/localize/tools";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CarApp';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('pl')
    translate.use('pl')
  }
}
