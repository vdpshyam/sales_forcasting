import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/MyServices/Authentication/auth.service';
import { FlaskapiService } from 'src/app/MyServices/Backend/flaskapi.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth-input',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  hide = true;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailMatcher = new MyErrorStateMatcher();

  passwordFormControl = new FormControl('', [Validators.required]);
  passwordMatcher = new MyErrorStateMatcher();

  onLoginClick() {
    this.http.authenticateUser(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe((res: any) => {
        console.log(res);
        this.auth.authRes = res.status;
        if (!res.status) {
          alert("Login Unsuccessful :( \n\n Please try again");
          location.reload();
        }
        this._router.navigate(['/upload-file']);
      })
  }
  constructor(private http: FlaskapiService, private auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

}