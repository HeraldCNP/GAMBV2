import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Tipo } from '../interfaces/tipo.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

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


  getTipos(): Observable<Tipo[]> {
    let url = `${this.URL}/tipos`;
    const header = this.headers;
    // console.log(url);
    return this.http.get<Tipo[]>(url, {headers: header});
  }

  createTipo(data: any): Observable<any> {
    const url = `${this.URL}/tipo`;
    const header = this.headers;
    return this.http.post<Tipo>(url, data, { headers: header });
  } 

  getTipo(id:any){
    const url = `${this.URL}/tipo/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  editTipo(data: any, id: any): Observable<any> {
    const url = `${this.URL}/tipo/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }

  deleteTipo(id: any): Observable<any> {
    const url = `${this.URL}/tipo/${id}`;
    const header = this.headers;
    return this.http.delete<any>(url, {headers: header});
  }

  uploadPlantilla(formData:any): Observable<HttpEvent<any>> {
    const header = this.headers;
    const req = new HttpRequest('POST', `${this.URL}/tipo`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: this.headers
    });
    return this.http.request(req);
  }


  createSubtipo(data: any, id: any): Observable<any> {
    const url = `${this.URL}/addSubTipo/${id}`;
    const header = this.headers;
    return this.http.patch<Tipo>(url, data, { headers: header });
  } 

  getSubtipo(id:any){
    const url = `${this.URL}/tipo/${id}`;
    const header = this.headers;
    return this.http.get<Tipo>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  editSubtipo(data: any, id: any): Observable<any> {
    const url = `${this.URL}/subTipo/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }




}
