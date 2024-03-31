import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Chart, registerables } from 'chart.js';

import { FlaskapiService } from 'src/app/MyServices/Backend/flaskapi.service';
import { PredictionDataService } from 'src/app/MyServices/Backend/prediction-data.service';

@Component({
  selector: 'app-prediction-screen',
  templateUrl: './prediction-screen.component.html',
  styleUrls: ['./prediction-screen.component.css']
})
export class PredictionScreenComponent implements OnInit {

  imageUrlTest!: any;
  imageUrlPred!: any;
  public chart: any;

  mse = this.predictionDataService.mse;
  rmse = this.predictionDataService.rmse;
  mape = this.predictionDataService.mape;
  selInt = this.predictionDataService.selInt;
  selMul = this.predictionDataService.selMul;

  constructor(private predictionDataService: PredictionDataService, private http: FlaskapiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.http.getPrediction()
      .subscribe((blob: any) => {
        console.log(blob);
        let objectURL = URL.createObjectURL(blob);
        this.imageUrlPred = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    this.http.getPredictionTest().subscribe(blob => {
      let objectURL = URL.createObjectURL(blob);
      this.imageUrlTest = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
    Chart.register(...registerables);
    this.createChart();
  }

  onLogoutClick() {
    localStorage.removeItem('token');
    location.reload();
  }

  onPredResultsDownloadClick() {
    this.http.downloadPredictionResults()
      .subscribe(data => {
        console.log(data)
        const a = document.createElement("a");
        a.href = "data:text/csv," + data;
        let filename = "Future sales prediction results";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
  }

  onDownloadClickOneStepAhead() {
    this.http.downloadPredictionResults()
      .subscribe(data => {
        console.log(data)
        const a = document.createElement("a");
        a.href = "data:text/csv," + data;
        let filename = "Future sales prediction results";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
  }

  onDownloadClickResid() {
    this.http.downloadPredictionResults()
      .subscribe(data => {
        console.log(data)
        const a = document.createElement("a");
        a.href = "data:text/csv," + data;
        let filename = "Future sales prediction results";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
  }

  onDownloadClickSalesTrainData() {
    this.http.downloadPredictionResults()
      .subscribe(data => {
        console.log(data)
        const a = document.createElement("a");
        a.href = "data:text/csv," + data;
        let filename = "Future sales prediction results";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
  }

  onDownloadClickSeasonal() {
    this.http.downloadPredictionResults()
      .subscribe(data => {
        console.log(data)
        const a = document.createElement("a");
        a.href = "data:text/csv," + data;
        let filename = "Future sales prediction results";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
  }

  onDownloadClickTrend() {
    this.http.downloadPredictionResults()
      .subscribe(data => {
        console.log(data)
        const a = document.createElement("a");
        a.href = "data:text/csv," + data;
        let filename = "Future sales prediction results";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: [null, null, null, null, null,
              null, '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
