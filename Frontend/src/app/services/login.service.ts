import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  userLogin(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', data);
  }
  userSignin(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/register', data);
  }
}
