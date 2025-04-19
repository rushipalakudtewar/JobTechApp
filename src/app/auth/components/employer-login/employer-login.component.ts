import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/alert.service';
@Component({
  selector: 'app-employer-login',
  standalone: false,
  templateUrl: './employer-login.component.html',
  styleUrl: './employer-login.component.css'
})
export class EmployerLoginComponent {
  title="rushi"
  loginForm:FormGroup;
  constructor(private authService: AuthService,private router:Router,private alertService:AlertService){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      let formData = this.loginForm.value;
      formData['role']="Employer";
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('role', res.role);
          this.alertService.showSuccess(res.message);

          this.router.navigate(['/employer/dashboard']); // ✅ Redirect to employee dashboard
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.alertService.showError(err);

        }
      });
    }
  }
}
