import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}auth/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}auth/register`, data);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }
}
