import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/alert.service';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-login',
  standalone: false,
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent {
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
      formData['role']="Employee";
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('role', res.role);
          this.alertService.showSuccess(res.message);

          this.router.navigate(['/employee/dashboard']); // ✅ Redirect to employee dashboard
        },
        error: (err) => {
          this.alertService.showSuccess(err);
          console.error('Login failed:', err);
        }
      });
    }
  }
}
