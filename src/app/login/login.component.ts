import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { CommonAPIService } from '../CommonService/common-api.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { Constants } from '../models/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** Variable Declared */
  
  /** email validation pattern */
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    public loginService: LoginService,
    public commonAPIService: CommonAPIService,
    public router: Router,
    public loaderService:LoaderService,
    public constants:Constants
  ) {

  }

  ngOnInit() {

  }

  /** USER LOGIN */
  onLoginSubmit(form) {
    this.loaderService.show();
    console.log(form);
    if (form.invalid) {
      this.loaderService.hide();
      return false;
      
    }
    this.commonAPIService.login(form.value.emailId, form.value.password)
      .pipe(first())
      .subscribe(data => {
        if (Array.isArray(data) && data.length) {
          if (data[0].isDoctor) {
            this.commonAPIService.isDoctor = true;
            this.loaderService.hide();
            this.router.navigate(['drProfile'],this.constants.routeNavParam);
          }
          else {
            this.loaderService.hide();
            this.commonAPIService.isDoctor = false;
            this.router.navigate(['patientProfile'],this.constants.routeNavParam);
          }
        }
        else {
          Swal.fire(
            'Login',
            'Username and Password is incorrect, please try again. !',
            'error'
          );
          this.commonAPIService.isDoctor = false;
          this.loginService.user.emailId = "";
          this.loginService.user.password = "";
          this.loaderService.hide();
          console.log(this.commonAPIService.isDoctor);     
          console.log(this.commonAPIService.isLoggedIn());    
         }
      });
      this.loaderService.hide();
  }

}
