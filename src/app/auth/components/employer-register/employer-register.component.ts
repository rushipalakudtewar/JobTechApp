import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/alert.service';

@Component({
  selector: 'app-employer-register',
  standalone: false,
  templateUrl: './employer-register.component.html',
  styleUrl: './employer-register.component.css'
})
export class EmployerRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private alertService:AlertService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let formData = this.registerForm.value;
      formData['role']="Employer";
      this.authService.register(this.registerForm.value).subscribe((res) => {
        this.alertService.showSuccess(res.message);

        this.router.navigate(['/auth/employer-login']);
      });
    }
  }
}
