import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../models/usuario.model';


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
  loggedIn() {
    if (localStorage.getItem('token')=='undefined'){
      return !!localStorage.getItem('');
    }
    else
    return !!localStorage.getItem('token');
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

  /*Servicios para Users*/

  getAllUsers():Observable<any>{
    let dir = `${this.URL}/users`;
    return this.http.get<any>(dir)
    .pipe( map( data => {
      return data.serverResponse
    } ) )
  }

  addUser(form:Usuario):Observable<Usuario>{
    let dir = `${this.URL}/users`;
    return this.http.post<any>(dir, form)
    // .pipe( map( data => {
    //   return data.serverResponse
    // } ) )
  }

  getSingleUser(id:any):Observable<any>{
    let dir = `${this.URL}/user/${id}`;
    console.log(dir)
    return this.http.get<any>(dir);
  }

}
