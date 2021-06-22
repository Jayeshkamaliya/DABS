import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading=false;
  constructor(){}

  /** SHOW LOADER ON PAGE */
  public show(){
    this._isLoading=true;
  }

   /** HIDE LOADER ON PAGE */
  public hide(){
    this._isLoading=false;
  }

  public isLoading(){
    return this._isLoading;
  }
}
