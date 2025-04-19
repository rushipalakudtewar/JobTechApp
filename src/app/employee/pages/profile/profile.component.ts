import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AlertService } from '../../../shared/alert.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  resumeFile!: File;
  fileName:String='';
  constructor(private employeeService: EmployeeService,private alertService:AlertService) {}
  profileDetails:any={};
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      skills: new FormControl('', Validators.required),
      resume: new FormControl(null),
      experience: new FormArray([]),
      education: new FormArray([]),
    });

    this.employeeService.getProfile().subscribe({
      next: (res) => {
        if (res.status) {
          this.profileDetails=res.data;
          console.log("tis",this.profileDetails);
          this.patchFormData()
        }
      }
    });
  }


  patchFormData(){
    this.profileForm.patchValue({
      name: this.profileDetails.name || '',
      skills: this.profileDetails.skills || ''
    });
    this.fileName = this.profileDetails?.resume || '';

    if (this.profileDetails.experience?.length) {
      this.profileDetails.experience.forEach((exp: any) => {
        this.experience.push(new FormGroup({
          company: new FormControl(exp.company),
          role: new FormControl(exp.role),
          from: new FormControl(exp.from?.substring(0, 10)),
          to: new FormControl(exp.to?.substring(0, 10)),
          description: new FormControl(exp.description)
        }));
      });
    }
    if (this.profileDetails.education?.length) {
      this.profileDetails.education.forEach((edu: any) => {
        this.education.push(new FormGroup({
          institution: new FormControl(edu.institution),
          degree: new FormControl(edu.degree),
          fieldOfStudy: new FormControl(edu.fieldOfStudy),
          startYear: new FormControl(edu.startYear),
          endYear: new FormControl(edu.endYear)
        }));
      });
    }
  }

  get experience(): FormArray {
    return this.profileForm.get('experience') as FormArray;
  }

  get education(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  addExperience(): void {
    this.experience.push(new FormGroup({
      company: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      description: new FormControl('')
    }));
  }

  removeExperience(index: number): void {
    this.experience.removeAt(index);
  }

  addEducation(): void {
    this.education.push(new FormGroup({
      institution: new FormControl('', Validators.required),
      degree: new FormControl('', Validators.required),
      fieldOfStudy: new FormControl('', Validators.required),
      startYear: new FormControl('', Validators.required),
      endYear: new FormControl('', Validators.required)
    }));
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  submitProfile() {
    const formData = new FormData();
    const data = this.profileForm.value;

    formData.append('name', data.name);
    formData.append('skills', data.skills);
    formData.append('experience', JSON.stringify(data.experience));
    formData.append('education', JSON.stringify(data.education));

    if (this.resumeFile) {
      formData.append('resume', this.resumeFile);
    }

    this.employeeService.updateProfile(formData).subscribe({
      next: (res) => {
      this.alertService.showSuccess('Profile updated successfully!');

      },
      error: (err) => {
        this.alertService.showSuccess(err);
      }
    });
  }
  
}
