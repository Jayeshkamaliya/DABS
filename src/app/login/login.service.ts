import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  public user ={
    userId:"0",
    emailId:"",
    password:""
  }

  
}
