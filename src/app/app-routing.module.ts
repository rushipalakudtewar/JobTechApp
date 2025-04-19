import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Employee'] }
  },
  {
    path: 'employer',
    loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Employer'] }
  },
  {
    path:'landing-page',
    component:LandingPageComponent
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { roles: ['Admin', 'SuperAdmin'] }
  // },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'landing-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
