import { Component, OnInit } from '@angular/core';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'patientProfile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  /**VARIABLE DECLARED */
  public patientDetails:any;
  public isDisabled:string="disabled";

  constructor(
    public commonAPIService:CommonAPIService,
    public loaderService:LoaderService) { }

  ngOnInit() {  
    this.loaderService.show();
    if(this.commonAPIService.UserDetails != null){
      this.patientDetails=this.commonAPIService.UserDetails[0];      
      this.commonAPIService.isDoctor=false;
    }     
    this.loaderService.hide();  
  }
  
}
