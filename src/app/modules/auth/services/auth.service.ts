import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL:string = 'http://159.223.119.115:8000/api';
  constructor(private http:HttpClient) { }
  loginByUser(form:LoginI):Observable<ResponseI>{
    let dir = `${this.URL}/login`;
    return this.http.post<ResponseI>(dir, form)
  }
}
