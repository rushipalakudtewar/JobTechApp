import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { EmployeeModule } from './employee/employee.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployerModule } from './employer/employer.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    EmployeeModule,
    EmployerModule,
    
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()),provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
