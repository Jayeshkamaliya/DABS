import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonAPIService } from '../CommonService/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private commonAPIService: CommonAPIService
  ) { }

  /** USER DETAIL JSON MODEL */
  public userDetail = {
    id: "0",
    emailAddress: "",
    password: "",
    name: "",
    phoneNo: "",
    degree: "",
    specialization: "",
    dateOfBirth: "",
    address: "",
    isDoctor: true,
    gender: "",
    experience:"",
    age:"",
    bloodGroup:""
  }

  /** ADD EDIT USER DETAILS */
  registerUser(method: string, user: any) {
    return this.commonAPIService.postData(method, user)
      .pipe(map(res => {
        return res.body;
      }));
  }

  /** RESET USER DETAIL */
  resetUserDetail() {
    this.userDetail.id = "0";
    this.userDetail.emailAddress = "";
    this.userDetail.password = "";
    this.userDetail.name = "";
    this.userDetail.phoneNo = "";
    this.userDetail.degree = "";
    this.userDetail.specialization = "";
    this.userDetail.dateOfBirth = "";
    this.userDetail.address = "";
    this.userDetail.isDoctor =true;
    this.userDetail.gender = "";
    this.userDetail.age = "";
    this.userDetail.experience = "";
    this.userDetail.bloodGroup = "";
  }

}
