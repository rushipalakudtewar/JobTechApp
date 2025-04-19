import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      const cloned = req.clone({
        withCredentials:true,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
// intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token  = localStorage.getItem('token');
//     const clonedRequest = request.clone({
//       withCredentials: true,
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     return next.handle(clonedRequest).pipe(
//       catchError((error:HttpErrorResponse)=>{
//         if(error.status===401)
//           {
            
//                 return this.authService.triggerRefreshtoken().pipe(
//                   switchMap(()=>{
//                     const newToken = localStorage.getItem('token');
//                     const newRequest = request.clone({
//                       withCredentials:true,
//                       setHeaders:{
//                         Authorization:`Bearer ${newToken}`
//                       }

//                     })
//                     return next.handle(newRequest);
//                   }),
//                   catchError((refreshError)=>{
//                     this.authService.logout();
//                     return throwError(refreshError)
//                   })
//                 )
              
//           }
//           return throwError(error)
//       })
//     )
//   }
}
