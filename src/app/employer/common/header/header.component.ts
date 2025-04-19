import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AlertService } from '../../../shared/alert.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        // Clear local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
  
        // Show success toast and navigate
        this.alertService.showSuccess(res.message || 'Logout successful');
        this.router.navigate(['/auth/employer-login']);
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Logout failed. Please try again.';
        this.alertService.showError(errorMessage);
      }
    });
  }
}
  
