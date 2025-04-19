import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: EmployeeComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Employee'] },
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'profile', component: ProfileComponent },

          // other employee pages
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class EmployeeRoutingModule { }
