import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth'; 
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  get refreshToken$() {
    return this.refreshTokenSubject.asObservable();
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    });
  }
  
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, {
      withCredentials: true
    });
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  triggerRefreshToken() {
    this.refreshTokenSubject.next(true);
  }

  triggerRefreshtoken():Observable<any>
  {
    return this.http.post(`${this.apiUrl}/refreshtoken`,{}).pipe(
      tap((res:any)=>{
        // console.log(res);
        localStorage.setItem('access_token',res.token);
      })
    )
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }
  
  
}
