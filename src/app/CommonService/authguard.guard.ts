import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { CommonAPIService } from "./common-api.service";
import { Router } from "@angular/router";
import { Constants } from "../models/constants";

@Injectable()
export class AuthguardGuard implements CanActivate {

    constructor(
        private commonAPIService: CommonAPIService,
        public router:Router,
        public constants:Constants) { }
    /** CHECK USER ACTIVATE OR LOGOUT */
    canActivate() {
        console.log('calling canactivate');
        if (this.commonAPIService.isLoggedIn()) {
            return true;
        }
        else {
            this.commonAPIService.logout();
            this.router.navigate(['login'],this.constants.routeNavParam)
        }
    }
}