import { Component } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-listing',
  standalone: false,
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css'
})
export class JobListingComponent {
  jobs:any[]=[];
  constructor(private employerService:EmployerService,private router:Router){}
  ngOnInit(){
    this.fetchJobs()
  }

  fetchJobs() {
    const query = ''; // You can dynamically build this later if needed
    this.employerService.getMyJobs(query).subscribe({
      next: (res) => {
        console.log('Jobs:', res);
        this.jobs = res;
      },
      error: (err) => {
        console.error('Failed to fetch jobs', err);
      }
    });
  }

  navigateToAddJob(){
    this.router.navigate(['/employer/add-job']);

  }
}
