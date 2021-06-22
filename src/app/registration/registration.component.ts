import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { Constants } from '../models/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  /** VARIABLE DECLARED */

  /** email validation pattern */
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  /** Password validation pattern */
  pswPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  isValidFormSubmitted = false;
  public genderList = [
    { displayValue: 'Male', dbValue: 'Male' },
    { displayValue: 'Female', dbValue: 'Female' },
    { displayValue: 'Other', dbValue: 'Other' },
  ]

  /** ALL BLOOD GROUP NAME LIST */
  public bloodGrpList = [
    { displayValue: 'A Positive', dbValue: 'A Positive' },
    { displayValue: 'A Negative', dbValue: 'A Negative' },
    { displayValue: 'B Positive', dbValue: 'B Positive' },
    { displayValue: 'B Negative', dbValue: 'B Negative' },
    { displayValue: 'O Positive', dbValue: 'O Positive' },
    { displayValue: 'O Negative', dbValue: 'O Negative' },
    { displayValue: 'AB Positive', dbValue: 'AB Positive' },
    { displayValue: 'AB Negative', dbValue: 'AB Negative' }
  ]

  constructor(
    public registrationService: RegistrationService,
    public router: Router,
    public loaderService: LoaderService,
    public constants:Constants
  ) { }

  ngOnInit() {
  }

  /** USER TYPE SELECT (DOCTOR OR PATIENT) */
  onChangeUser(event) {   
    this.registrationService.userDetail.isDoctor = event;    
  }

  /** USER VALIDATION  */
  registerValidation() {
    var result = true;
    if (this.registrationService.userDetail.emailAddress == "" ||
      this.registrationService.userDetail.password == "" ||
      this.registrationService.userDetail.name == "" ||
      this.registrationService.userDetail.phoneNo == "" ||
      this.registrationService.userDetail.address == "") {
      result = false;
    }
    else if (this.registrationService.userDetail.isDoctor) {
      if (this.registrationService.userDetail.degree == "" ||
        this.registrationService.userDetail.specialization == "" ||
        this.registrationService.userDetail.experience == "") {
        result = false;
      }
    }
    else if (!this.registrationService.userDetail.isDoctor) {
      if (this.registrationService.userDetail.age == "" ||
        this.registrationService.userDetail.bloodGroup == "") {
        result = false;
      }
    }
    return result;
  }

  /** ONLY NUMBER VALIDATION */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  /** SAVE USER DETAIL */
  saveUserDetail() {
    this.loaderService.show();
    if (this.registerValidation()) {
      this.registrationService.registerUser("User/SaveUser", this.registrationService.userDetail)
        .subscribe(res => {
          if (res[1] == 'Yes') {
            Swal.fire(
              'Registration',
              'Your Registration is successfully, You can log in.. .!',
              'success'
            );
            this.registrationService.resetUserDetail();
            this.loaderService.hide();
            this.router.navigate([''],this.constants.routeNavParam);
          }
          else if (res[1] == 'No') {
            Swal.fire(
              'Oops',
              'Something is wrong, please try again',
              'error'
            );
            this.loaderService.hide();
          }
        });
    }
    this.loaderService.hide();
  }

}
