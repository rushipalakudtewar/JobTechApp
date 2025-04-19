import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { JobListingComponent } from './pages/job-listing/job-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    EmployerComponent,
    HeaderComponent,
    FooterComponent,
    AddJobComponent,
    JobListingComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmployerModule { }
