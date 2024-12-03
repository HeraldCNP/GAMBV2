import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Dependencia } from '../interfaces/dependencia.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DependenciasService {
  private readonly URL = environment.api;


  constructor(private http: HttpClient) {}
  private authService = inject(AuthService)

  get token(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    return token;
  }

  get headers(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return headers;
  }


  getDependencias(): Observable<Dependencia[]> {
    let url = `${this.URL}/dependencias`;
    const header = this.headers;
    // console.log(url);
    return this.http.get<Dependencia[]>(url, {headers: header});
  }

  createDependencia(data: any): Observable<any> {
    const url = `${this.URL}/dependencia`;
    const header = this.headers;
    return this.http.post<Dependencia>(url, data, { headers: header });
  } 

  getDependencia(id:any){
    const url = `${this.URL}/dependencia/${id}`;
    const header = this.headers;
    return this.http.get<Dependencia>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  editDependencia(data: any, id: any): Observable<any> {
    const url = `${this.URL}/dependencia/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }

  deleteDependencia(id: any): Observable<any> {
    const url = `${this.URL}/dependencia/${id}`;
    const header = this.headers;
    return this.http.delete<any>(url, {headers: header});
  }

}
