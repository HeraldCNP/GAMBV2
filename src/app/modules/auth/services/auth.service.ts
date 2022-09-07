import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api
  constructor(private http:HttpClient) { }

  loginByUser(form:LoginI):Observable<any>{
    let dir = `${this.URL}/login`;
    return this.http.post<any>(dir, form)
  }
}
