import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PredictionDataService {

  mse:any;
  rmse:any;
  mape:any;

  selInt:any;
  selMul:any;
  
  constructor() { }
}
