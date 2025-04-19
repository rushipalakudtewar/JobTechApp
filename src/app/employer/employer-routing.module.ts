import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { EmployerComponent } from './employer.component';
import { JobListingComponent } from './pages/job-listing/job-listing.component';
import { AddJobComponent } from './pages/add-job/add-job.component';

const routes: Routes = [
    {
        path: '',
        component: EmployerComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Employer'] },
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'my-jobs', component: JobListingComponent },
          { path: 'add-job', component: AddJobComponent },
    
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class EmployerRoutingModule { }
