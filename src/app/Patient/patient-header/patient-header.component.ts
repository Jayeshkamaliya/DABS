import { Component, OnInit } from '@angular/core';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css']
})
export class PatientHeaderComponent implements OnInit {

  constructor(public commonAPIService:CommonAPIService ) { }

  ngOnInit() {
  }

  logout()
  {
    this.commonAPIService.logout();
  }
}
