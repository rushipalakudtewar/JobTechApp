import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerService } from '../../services/employer.service';
import { AlertService } from '../../../shared/alert.service';

@Component({
  selector: 'app-add-job',
  standalone: false,
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit {
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private employerService:EmployerService,private alertService:AlertService) {}

  ngOnInit(): void {
    this.jobForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      skillsRequired: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required, Validators.min(0)]),
      employmentType: new FormControl('', [Validators.required]),
      experienceRequired: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }


  submitJob(){
    if (this.jobForm.valid) {
      const formValue = this.jobForm.value;
      const newJob = {
        ...formValue,
        skillsRequired: formValue.skillsRequired.split(',').map((s: string) => s.trim())
      };
      this.employerService.createjob(newJob).subscribe({
        next: (res) => {
          if(res.status){
            console.log('new:', res.data);
            this.alertService.showSuccess(res.message);
            this.router.navigate(['/employer/my-jobs'])
          }
        },
        error: (err) => {
          this.alertService.showError(err);
        }
      });
    }
  }
}

