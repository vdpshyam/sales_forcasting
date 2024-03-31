import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../MyServices/Authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
  constructor(private _router: Router, private _auth:AuthService) { }

  loggedIn = false;

  canActivate() {
    if (this._auth.isLoggedIn()) {
      localStorage.setItem('token','qwertyuiopasdfghjklzxcvbnm');
      return true;
    }else{
      this._router.navigate(['']);
      return false;
    }
  }
  
}
