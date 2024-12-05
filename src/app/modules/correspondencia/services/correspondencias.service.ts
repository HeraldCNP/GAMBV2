import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciasService {

  private readonly URL = environment.api;
  formData:any;


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


  getCorrespondencias(params?: any): Observable<any[]> {
    let url = `${this.URL}/correspondencias`;
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    // console.log(params);
    
    return this.http.get<any>(url, { params: httpParams, headers: header });
  }


  downloadCorrespondencia(name: string): Observable<Blob> {
    const header = this.headers;
    return this.http.get(`${this.URL}/plantilla/${name}`, { headers: header, responseType: 'blob' });
  }

  getFuncionario(cargo:string){
    const url = `${this.URL}/userPost/${cargo}`;
    console.log(url);
    
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
  }

  
  createCorrespondencia(data: any): Observable<any> {
    const url = `${this.URL}/correspondencia`;
    const header = this.headers;
    return this.http.post<any>(url, data, { headers: header });
  }

  editCorrespondencia(data: any, id: any): Observable<any> {
    const url = `${this.URL}/correspondencia/${id}`;
    const header = this.headers;
    return this.http.put<any>(url, data, {headers: header});
  }

  getDependencia(id:any){
    const url = `${this.URL}/dependencia/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
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

  buscarUltimo(params?: any): Observable<any> {
    const url = `${this.URL}/buscarUltimo`;
    console.log(params);
    
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    // console.log(url);
    return this.http.get<any>(url, { params: httpParams, headers: header });
  }

  uploadDocument(file: File, id: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const header = this.headers;
    this.formData = formData.append('file', file);
    const req = new HttpRequest('PUT', `${this.URL}/uploadCorrespondencia/${id}`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: this.headers
    });
    return this.http.request(req);
  }



}
