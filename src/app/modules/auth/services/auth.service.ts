import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.api
  constructor(private http:HttpClient) { }

  loginByUser(form:LoginI):Observable<any>{
    let dir = `${this.URL}/login`;
    return this.http.post<any>(dir, form)
  }

  /*Servicios para Unidades*/

  getAllUnits():Observable<any>{
    let dir = `${this.URL}/org`;
    return this.http.get<any>(dir);
  }

  sendUnit(unit: any):Observable<any>{
    let dir = `${this.URL}/org`;
    return this.http.post<any>(dir, unit);
  }

  deleteUnit(id:any):Observable<any>{
    let dir = `${this.URL}/org/${id}`;
    return this.http.delete<any>(dir, id)
  }


  /* Servicios para Cargos*/


  getUnit(id:any):Observable<any>{
    let dir = `${this.URL}/orgs/${id}`;
    return this.http.get<any>(dir, id);
  }

  sendCharge(unit: any, id:any):Observable<any>{
    console.log(unit);
    let dir = `${this.URL}/subdir/${id}`;
    return this.http.put<any>(dir, unit);
  }


}
