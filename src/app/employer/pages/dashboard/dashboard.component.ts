import { Component } from '@angular/core';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  applications: any[] = [];
  loading:Boolean=false;
  constructor(private employerService:EmployerService){}
  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.loading=true;
    this.employerService.getApplicationsForEmployer().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.applications = res.data;
        }
        this.loading=false;
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
        this.loading=false;
      }
    });
  }

}
