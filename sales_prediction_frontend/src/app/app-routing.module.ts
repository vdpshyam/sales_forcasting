import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginScreenComponent } from './MyComponents/login-screen/login-screen.component';
import { FileInputComponent } from './MyComponents/file-input/file-input.component';
import { PredictionScreenComponent } from './MyComponents/prediction-screen/prediction-screen.component';
import { ErrorScreenComponent } from './MyComponents/error-screen/error-screen.component';
import { MyGuardGuard } from './MyGuards/my-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginScreenComponent
  },
  {
    path: 'upload-file',
    component: FileInputComponent,
    canActivate: [MyGuardGuard],
  },
  {
    path: 'sales-prediction',
    component: PredictionScreenComponent,
    canActivate: [MyGuardGuard]
  }
  ,
  {
    path: '**',
    component: ErrorScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
