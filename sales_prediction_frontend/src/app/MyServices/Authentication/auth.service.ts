import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authRes!: boolean;

  isLoggedIn() {
    if(localStorage.getItem('token')){
      return true;
    }
    return this.authRes;
  }
}
