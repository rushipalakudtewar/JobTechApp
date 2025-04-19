import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${environment.apiUrl}${url}`);
  }

  post<T>(url: string, data: any) {
    return this.http.post<T>(`${environment.apiUrl}${url}`, data);
  }
}
