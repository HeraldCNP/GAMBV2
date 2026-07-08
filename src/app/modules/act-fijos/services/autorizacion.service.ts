import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private readonly URL = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) {

  }

  get token(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    return token;
  }
  get headers() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return headers;
  }

  // getAllAutorizaciones(area?: string, tipo?: string, subTipo?: string): Observable<any[]> {
  //   let dir = `${this.URL}/autorizaciones?area=${area}&tipo=${tipo}&subTipo=${subTipo}`;
  //   console.log(dir);
  //   return this.http.get<any>(dir);
  // }

  getAllAutorizaciones(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/autorizaciones?limit=${limit}&skip=${skip}`;
    return this.http.get<any>(dir);
  }

  getAllUnidadSolicitante(): Observable<any[]> {
    let dir = `${this.URL}/subdir`;
    return this.http.get<any>(dir);
  }

  getAllVehiculos(): Observable<any[]> {
    let dir = `${this.URL}/vehiculos`;
    return this.http.get<any>(dir);
  }

  getAllConductores(): Observable<any[]> {
    let dir = `${this.URL}/listUsers?roles=CHOFER`;
    return this.http.get<any>(dir);
  }


  registrarAutorizacion(form: any): Observable<any> {
    let dir = `${this.URL}/autorizacion`;
    return this.http.post<any>(dir, form);
  }

  getSingleAutorizacion(id: any): Observable<any[]> {
    var dir = `${this.URL}/autorizacion/${id}`;
    return this.http.get<any[]>(dir);
  }

  editAutorizacion(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/autorizacion/${id}`;
    return this.http.put<any>(dir, form)
  }

  deleteAutorizacion(id: any) {
    let dir = `${this.URL}/autorizacion/${id}`;
    return this.http.delete<any>(dir, id);
  }

  createOrden(form: any) {
    let dir = `${this.URL}/orden`;
    const header = this.headers;
    return this.http.post(dir, form, { headers: header })
  }

  queryOrdenes(params?: any) {
    let dir = `${this.URL}/queryOrden`;
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(dir, { params: httpParams, headers: header });
  }

  printOrden(id: string): Observable<Blob> {
    const url = `${this.URL}/printOrden/${id}`;
    const header = this.headers;
    console.log('url', url);
    // return `${url} { headers: header, responseType: 'blob' }`;
    return this.http.get(`${url}`, { headers: header, responseType: 'blob' });
  }

    getOrden(id: string) {
    let dir = `${this.URL}/orden/${id}`;
    const header = this.headers;
    return this.http.get<any>(dir, { headers: header });
  }

   editOrden(id: any, fd: any): any {
    let dir = `${this.URL}/orden/${id}`;
    return this.http.patch<any>(dir, fd);
  }

}
