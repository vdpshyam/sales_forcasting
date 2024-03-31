import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  status: any;
}

@Injectable({
  providedIn: 'root'
})
export class FlaskapiService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:5000/';
  fd = new FormData();

  authenticateUser(enteredUserId: any, enteredUserPassword: any) {
    return this.http.post(this.url + 'login-auth', {
      'enteredUserId': enteredUserId,
      'enteredUserPassword': enteredUserPassword
    });
  }

  sendForm(inputFile: File,duration: any){
    this.fd.append('duration',duration)
    this.fd.append('file', inputFile, inputFile.name)
    return this.http.post(this.url + 'ml-prediction', this.fd);
  }

  sendInputFileData(inputFile: File) {
    this.fd.append('file', inputFile, inputFile.name);
    return this.http.post(this.url + 'upload-file', this.fd);
  }

  sendInputDuration(duration: any) {
    return this.http.post(this.url + 'upload-interval', {
      'duration': duration
    });
  }

  getPredictionTest() {
    return this.http.get(this.url + '/get-pred-test', { responseType: 'blob' })
  }

  getPrediction() {
    return this.http.get(this.url + '/get-pred', { responseType: 'blob' })
  }

  downloadPredictionResults(){
    return this.http.get(this.url + '/get-pred-CSV', { responseType: 'text' as 'json' })
  }
}
