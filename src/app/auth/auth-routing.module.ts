import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { EmployerLoginComponent } from './components/employer-login/employer-login.component';
import { EmployerRegisterComponent } from './components/employer-register/employer-register.component';

const routes: Routes = [
  { path: 'employee-login', component: EmployeeLoginComponent },
  { path: 'employee-register', component: EmployeeRegisterComponent },
  { path: 'employer-login', component: EmployerLoginComponent },
  { path: 'employer-register', component: EmployerRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AuthRoutingModule { }
