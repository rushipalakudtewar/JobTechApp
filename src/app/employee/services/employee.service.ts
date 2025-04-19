import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getAllJobs(query: any): Observable<any> {
    return this.http.get(`${this.apiUrl}jobs` + query, { withCredentials: true });
  }
  
  applyForJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}applications`, data, { withCredentials: true });
  }
  
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}profile/employee`, data, { withCredentials: true });
  }
  
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}profile/employee`, { withCredentials: true });
  }
  

}
