import { Component } from '@angular/core';
import { CommonAPIService } from './CommonService/common-api.service';
import { Constants } from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   isLogin: boolean = false;
  constructor (
    public commonAPIService:CommonAPIService,
    public constants:Constants) {
    this.commonAPIService.isLoggedIn();    
    }
}
