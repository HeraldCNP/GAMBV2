import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesembolsoService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) {}

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

  createDesembolso(form: any) {
    let dir = `${this.URL}/desembolso`;
    const header = this.headers;
    console.log(form);

    return this.http.post(dir, form, { headers: header });
  }

  getDesembolsos(
    skip: number = 0,
    limit: number = 20,
    catProgra?: string,
    estado?: string,
    del?: string,
    al?: string,
    numeroVale?: string
  ) {
    let dir = `${this.URL}/desembolsos?skip=${skip}&limit=${limit}`;
    if (catProgra) {
      dir += `&catProgra=${catProgra}`;
    }
    if (estado) {
      dir += `&estado=${estado}`;
    }
    if (del) {
      dir += `&del=${del}`;
    }
    if (al) {
      dir += `&al=${al}`;
    }
    if (numeroVale) {
      dir += `&numeroVale=${numeroVale}`;
    }
    return this.http.get(dir, { headers: this.headers });
  }
  queryDesembolso(params?: any) {
    let dir = `${this.URL}/queryDesembolsos`;
    const header = this.headers;
    let httpParams = new HttpParams();
    console.log('params', params);
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(dir, { params: httpParams, headers: header });
  }

  getTipoFondos() {
    let dir = `${this.URL}/tipoDesembolsos`;
    return this.http.get(dir, { headers: this.headers });
  }
  getDesembolso() {
    let dir = `${this.URL}/desembolsos`;
    return this.http.get(dir, { headers: this.headers });
  }
  deleteDesembolso(id: string) {
    let dir = `${this.URL}/desembolso/${id}`;
    return this.http.delete(dir, { headers: this.headers });
  }
  addTipoFondo(form: any) {
    let dir = `${this.URL}/tipoDesembolso`;
    return this.http.post(dir, form, { headers: this.headers });
  }
  editTipoFondo(form: any, id: any) {
    let dir = `${this.URL}/tipoDesembolso/${id}`;
    return this.http.patch(dir, form, { headers: this.headers });
  }
  deleteTipoFondo(id: string) {
    let dir = `${this.URL}/tipoDesembolso/${id}`;
    return this.http.delete(dir, { headers: this.headers });
  }

  //--------------Fuentes------------
  getFuentes() {
    let dir = `${this.URL}/fuentes`;
    return this.http.get(dir, { headers: this.headers });
  }
  addFuente(form: any) {
    let dir = `${this.URL}/fuente `;
    return this.http.post(dir, form, { headers: this.headers });
  }
  editFuente(form: any, id: any) {
    let dir = `${this.URL}/fuente/${id}`;
    return this.http.patch(dir, form, { headers: this.headers });
  }
  deleteFuente(id: string) {
    let dir = `${this.URL}/fuente/${id}`;
    return this.http.delete(dir, { headers: this.headers });
  }
  //--------------Gastos Fondos------------
  getGastosFondos() {
    let dir = `${this.URL}/gastoFondos`;
    return this.http.get(dir, { headers: this.headers });
  }
  addGastoFondo(form: any) {
    let dir = `${this.URL}/gastoFondo`;
    return this.http.post(dir, form, { headers: this.headers });
  }
  editGastoFondo(form: any, id: any) {
    let dir = `${this.URL}/gastoFondo/${id}`;
    return this.http.patch(dir, form, { headers: this.headers });
  }
  deleteGastoFondo(id: string) {
    let dir = `${this.URL}/gastoFondo/${id}`;
    return this.http.delete(dir, { headers: this.headers });
  }

  //---------------DESEMBOLSO FUENTES----------------
  getDesembolsoFuentes() {
    let dir = `${this.URL}/desemFuentes`;
    return this.http.get(dir, { headers: this.headers });
  }
  addDesembolsoFuente(form: any) {
    let dir = `${this.URL}/desemFuente`;
    return this.http.post(dir, form, { headers: this.headers });
  }
  editDesembolsoFuente(form: any, id: any) {
    let dir = `${this.URL}/desembolsoFuente/${id}`;
    return this.http.patch(dir, form, { headers: this.headers });
  }
  deleteDesembolsoFuente(id: string) {
    let dir = `${this.URL}/desembolsoFuente/${id}`;
    return this.http.delete(dir, { headers: this.headers });
  }

  printDesembolso(id: string): Observable<Blob> {
    const url = `${this.URL}/printDesembolso/${id}`;
    const header = this.headers;
    console.log('url', url);
    // return `${url} { headers: header, responseType: 'blob' }`;
    return this.http.get(`${url}`, { headers: header, responseType: 'blob' });
  }

   printDesembolsoGasto(id: string): Observable<Blob> {
    const url = `${this.URL}/printDesemGasto/${id}`;
    const header = this.headers;
    console.log('url', url);
    // return `${url} { headers: header, responseType: 'blob' }`;
    return this.http.get(`${url}`, { headers: header, responseType: 'blob' });
  }

  //------GASTOS---------//

  getGastos() {
    let dir = `${this.URL}/gastos`;
    return this.http.get(dir, { headers: this.headers });
  }
  addGasto(form: any) {
    let dir = `${this.URL}/gasto`;
    return this.http.post(dir, form, { headers: this.headers });
  }

   queryGastos(params?: any) {
    let dir = `${this.URL}/queryGastos`;
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
  printGasto(params?: any): Observable<Blob> {
  const dir = `${this.URL}/printQueryGastos`;
  let httpParams = new HttpParams();
  const header = this.headers;
  console.log('params', params);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
  }

  return this.http.get(dir, { params: httpParams, headers: header, responseType: 'blob' });
}
  //------Fuente Finan---------//

  getFuenteFinanciadores() {
    let dir = `${this.URL}/fuenteFinanciamientos`;
    return this.http.get(dir, { headers: this.headers });
  }

  //------Org Finan---------//
  getOrgFinanciadores() {
    let dir = `${this.URL}/organismoFinanciadores`;
    return this.http.get(dir, { headers: this.headers });
  }

  //-------DESCARGO---------//

  getDescargos() {
    let dir = `${this.URL}/descargos`;
    return this.http.get(dir, { headers: this.headers });
  }
  addDescargo(form: any) {
    let dir = `${this.URL}/descargo`;
    return this.http.post(dir, form, { headers: this.headers });
  }
    queryDescargos(params?: any) {
    let dir = `${this.URL}/queryDescargos`;
    const header = this.headers;
    let httpParams = new HttpParams();
    console.log('params', params);
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(dir, { params: httpParams, headers: header });
  }
  printDescargoGasto(id: string): Observable<Blob> {
    const url = `${this.URL}/printDescargo/${id}`;
    const header = this.headers;
    console.log('url', url);
    // return `${url} { headers: header, responseType: 'blob' }`;
    return this.http.get(`${url}`, { headers: header, responseType: 'blob' });
  }
}
