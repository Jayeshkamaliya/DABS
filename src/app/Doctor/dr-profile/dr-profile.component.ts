import { Component, OnInit } from '@angular/core';
import { CommonAPIService } from 'src/app/CommonService/common-api.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'drProfile',
  templateUrl: './dr-profile.component.html',
  styleUrls: ['./dr-profile.component.css']
})
export class DrProfileComponent implements OnInit {
  /** VARIABLE DECLARED */
  public doctorDetails:any;
  public isDisabled:string="disabled";

  constructor(
    public commonAPIService:CommonAPIService,
    public loaderService:LoaderService) { }

  ngOnInit() { 
    this.loaderService.show();   
    if(this.commonAPIService.UserDetails != null){
      this.doctorDetails=this.commonAPIService.UserDetails[0];
      this.commonAPIService.isDoctor=true;
    }
    this.loaderService.hide();  
  }
  
}
