import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { FlaskapiService } from 'src/app/MyServices/Backend/flaskapi.service';
import { PredictionDataService } from 'src/app/MyServices/Backend/prediction-data.service';


//Days,Weeks,Months,Years
interface DaWeMoYe {
  days: number;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {
  constructor(private httpService: FlaskapiService, private predictionDataService: PredictionDataService, private router: Router) { }

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 10;
  showingProgressSpinner = false;

  selectedDWMY!: any;
  multiplier!: any;
  selectedFile!: File;
  duration: any;

  daWeMoYe: DaWeMoYe[] = [
    { days: 1, viewValue: 'Days' },
    { days: 7, viewValue: 'Weeks' },
    { days: 30, viewValue: 'Months' },
    { days: 365, viewValue: 'Years' }
  ];


  numberFormControl = new FormControl('', [Validators.required]);
  numberMatcher = new MyErrorStateMatcher();

  onSubmitClick() {
    this.showingProgressSpinner = true;

    console.log(this.selectedFile);
    console.log(this.selectedDWMY);
    console.log(this.numberFormControl.value);

    this.multiplier = this.numberFormControl.value;

    this.predictionDataService.selMul = this.multiplier;

    if (this.selectedDWMY == 1) {
      this.duration = Math.ceil(this.multiplier / 30);
      this.predictionDataService.selMul = this.duration <= 1 ? 30 : this.multiplier;
      this.predictionDataService.selInt = 'days'
      console.log(this.duration);
    } else if (this.selectedDWMY == 7) {
      this.duration = Math.ceil((this.multiplier * this.selectedDWMY) / 30);
      this.predictionDataService.selMul = this.duration < 1 ? 4 : this.multiplier;
      this.predictionDataService.selInt = 'weeks'
      console.log(this.duration);
    } else if (this.selectedDWMY == 30) {
      this.duration = this.multiplier;
      this.predictionDataService.selMul = this.duration <= 1 ? 1 : this.multiplier;
      this.predictionDataService.selInt = this.duration == 1 ? 'month' : 'months'
      console.log(this.duration);
    } else if (this.selectedDWMY == 365) {
      this.duration = Math.round((this.multiplier * this.selectedDWMY) / 30);
      this.predictionDataService.selMul = this.duration <= 1 ? 1 : this.multiplier;
      this.predictionDataService.selInt = this.duration == 1 ? 'month' : 'years'
      console.log(this.duration);
    }

    this.httpService.sendForm(this.selectedFile, this.duration).subscribe((data: any) => {
      console.log(data);
      this.predictionDataService.mse = data.mse;
      this.predictionDataService.rmse = data.rmse;
      this.predictionDataService.mape = data.mape;
      this.showingProgressSpinner = false;
      this.router.navigate(['sales-prediction']);
    })
  }

  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onLogoutClick(){
    localStorage.removeItem('token');
    location.reload();
  }

  ngOnInit(): void {
  }

}
