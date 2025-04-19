import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private apiUrl = environment.apiUrl; 

  constructor(private http:HttpClient) { }

  getMyJobs(query: any): Observable<any> {
    return this.http.get(`${this.apiUrl}jobs/my-jobs`+query);
  }
  createjob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}jobs`,data);
  }

  getApplicationsForEmployer(): Observable<any> {
    return this.http.get(`${this.apiUrl}applications`); // endpoint for aggregated applications
  }
    
}
