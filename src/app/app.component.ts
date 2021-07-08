import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brtNews';
  mainLoaderIs: boolean = false;
  constructor(public header: HeaderComponent){

  }
}
