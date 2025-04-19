import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AlertService } from '../../../shared/alert.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  jobList: any[] = [];

filters = {
  location: '',
  employmentType: '',
  experience: '',
  salary: '',
  skills: ''
};
page = 1;
totalPages = 1;
showFilters = true;


  constructor(private employeeService: EmployeeService,private alertService:AlertService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    let query = `?page=${this.page}&limit=5`;

    Object.entries(this.filters).forEach(([key, val]) => {
      if (val) {
        query += `&${key}=${val}`;
      }
    });
    this.employeeService.getAllJobs(query).subscribe({
      next: (res) => {
        console.log('Jobs:', res);
        this.jobList = res.data;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        console.error('Failed to fetch jobs', err);
      }
    });
  }
  onFilterChange() {
    this.page = 1;
    this.fetchJobs();
  }
  changePage(increment: number) {
    this.page += increment;
    this.fetchJobs();
  }
  applyToJob(jobId:any){
    console.log("jobId ",jobId);
    let formData:any={};
    formData['jobId']= jobId.toString();
    
    this.employeeService.applyForJob(formData).subscribe({
      next: (res) => {
        this.jobList = res;
        this.alertService.showSuccess(res.message);

      },
      error: (err) => {
        console.error('Failed to fetch jobs', err);
      this.alertService.showError(err);

      }
    });
  }
}
