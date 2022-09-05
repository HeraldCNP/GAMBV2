import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL:string = '';
  constructor(private http:HttpClient) { }
  loginByUser(form:LoginI):Observable<any>{
    let dir = `${this.URL}/login`;
    return this.http.post<any>(dir, form)
  }
}
