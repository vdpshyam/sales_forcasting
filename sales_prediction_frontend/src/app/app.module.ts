import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { LoginScreenComponent } from './MyComponents/login-screen/login-screen.component';
import { FileInputComponent } from './MyComponents/file-input/file-input.component';
import { PredictionScreenComponent } from './MyComponents/prediction-screen/prediction-screen.component';
import { ErrorScreenComponent } from './MyComponents/error-screen/error-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    FileInputComponent,
    PredictionScreenComponent,
    ErrorScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
