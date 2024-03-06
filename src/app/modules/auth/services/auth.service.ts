import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { environment } from '../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.api
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  get token(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
    }
    return token;
  }
  get headers() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return headers;
  }



  loginByUser(form: LoginI): Observable<any> {
    let dir = `${this.URL}/login`;
    return this.http.post<any>(dir, form)
  }
  loggedIn() {
    if (localStorage.getItem('token') == 'undefined') {
      return !!localStorage.getItem('');
    }
    else
      return !!localStorage.getItem('token');
  }

  /*Servicios para Unidades*/

  getAllUnits(): Observable<any> {
    let dir = `${this.URL}/org`;
    return this.http.get<any>(dir);
  }

  sendUnit(unit: any): Observable<any> {
    let dir = `${this.URL}/org`;
    return this.http.post<any>(dir, unit);
  }

  deleteUnit(id: any): Observable<any> {
    let dir = `${this.URL}/org/${id}`;
    return this.http.delete<any>(dir, id)
  }


  /* Servicios para Cargos*/


  getUnit(id: any): Observable<any> {
    let dir = `${this.URL}/orgs/${id}`;
    return this.http.get<any>(dir, id);
  }

  sendCharge(unit: any, id: any): Observable<any> {
    console.log(unit);
    let dir = `${this.URL}/subdir/${id}`;
    return this.http.put<any>(dir, unit);

  }

  /*Servicios para Users*/

  getAllUsers(): Observable<any> {
    let dir = `${this.URL}/users`;
    const header = this.headers;
    return this.http.get<any>(dir, { headers: header })
      .pipe(map(data => {
        return data.serverResponse
      }))
  }

  addUser(form: Usuario): Observable<Usuario> {
    let dir = `${this.URL}/users`;
    const header = this.headers;
    return this.http.post<any>(dir, form, { headers: header })
    // .pipe( map( data => {
    //   return data.serverResponse
    // } ) )
  }

  getSingleUser(id: any): Observable<any> {
    let dir = `${this.URL}/user/${id}`;
    console.log(dir)
    return this.http.get<any>(dir);
  }

  editUser(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/user/${id}`;
    const header = this.headers;
    return this.http.put<any>(dir, form, { headers: header })
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.cookieService.delete('token');
    this.router.navigate(['/'])
  }

  getAllCargos(): Observable<any[]> {
    let dir = `${this.URL}/subdir`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

}
