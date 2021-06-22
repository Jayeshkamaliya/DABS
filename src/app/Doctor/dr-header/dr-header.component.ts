import { Component, OnInit } from '@angular/core';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';

@Component({
  selector: 'dr-header',
  templateUrl: './dr-header.component.html',
  styleUrls: ['./dr-header.component.css']
})
export class DrHeaderComponent implements OnInit {

  constructor(public commonAPIService:CommonAPIService) { }

  ngOnInit() {
  }

  /** USER LOGOUT */
  logout()
  {
    this.commonAPIService.logout();
  }

}
