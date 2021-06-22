import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/User'
import { BehaviorSubject, from } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  /** VARIABLE DECLARED */
  private isValidUser = false;
  private UserSubject: BehaviorSubject<User>;
  public isDoctor = false;

  /** CONSTRUCTOR */
  constructor(
    private httpClient: HttpClient,
    public router: Router,
    public constants:Constants
  ) {
    this.UserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userDetails')));
  }  

  /** COMMON HTTP HEADERS */
  public httpHeaders = new HttpHeaders({
    'content-Type': 'application/json'
  });

  /** COMMON POST METHOD */
  postData(method: string, dataObj: any) {   
    return this.httpClient.post(`${environment.apiUrl}/` + method, dataObj, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  /** COMMON GET METHOD */
  getData(method: string){
    return this.httpClient.get(`${environment.apiUrl}/` + method, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }  

  /** GET LOGGED USER DETAILS */
  public get UserDetails() {
    return this.UserSubject.value;
  }

  /** USER LOGIN */
  login(emailId, password) {
    return this.httpClient.get<User>(`${environment.apiUrl}/User/login` + '?emailId=' + emailId + '&password=' + password)
      .pipe(map(user => {     
        if (Array.isArray(user) && user.length) {
          this.isValidUser = true;
          localStorage.setItem('userDetails', JSON.stringify(user));
          this.UserSubject.next(user);
          return user;
        }
        else{
          return false;
        }        
      }))
  }

  /** RETURN IS VALID USER STATUS */
  isLoggedIn() {
    return this.isValidUser;
  }

  /** USER LOGOUT */
  logout() {
    this.isValidUser = false;
    this.resetUserData();
    this.router.navigate([''],this.constants.routeNavParam);
  }

  /** RESET USER DATA */
  resetUserData() {
    localStorage.removeItem('userDetails');
    this.UserSubject.next(null);
    this.router.navigate([''],this.constants.routeNavParam);
  }
}
