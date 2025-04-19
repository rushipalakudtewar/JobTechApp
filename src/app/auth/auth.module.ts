import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { EmployerLoginComponent } from './components/employer-login/employer-login.component';
import { EmployerRegisterComponent } from './components/employer-register/employer-register.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations:[
    EmployeeLoginComponent,
    EmployeeRegisterComponent,
    EmployerLoginComponent,
    EmployerRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     
  ]
})
export class AuthModule { }
