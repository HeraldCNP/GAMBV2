import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) { }

  // getAllEgresos(limit?: number, skip?: number): Observable<any[]> {
  //   let dir = `${this.URL}/egresos?limit=${limit}&skip=${skip}`;
  //   console.log(dir);
  //   return this.http.get<any>(dir);
  // }

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

  getAllEgresos(limit?: number, skip?: number, entregado?:string, cargo?:string, glosaSalida?:string, numeroSalida?:any, del?:any, al?:any): Observable<any[]> {
    let dir = `${this.URL}/egresos?limit=${limit}&skip=${skip}&entregado=${entregado}&cargo=${cargo}&glosaSalida=${glosaSalida}&numeroSalida=${numeroSalida}&del=${del}&al=${al}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  searchEgreso(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchegreso/${termino}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  getEgreso(id: any): Observable<any> {
    let dir = `${this.URL}/egreso/${id}`;
    return this.http.get<any>(dir)
  }

  deleteEgreso(id: any) {
    let dir = `${this.URL}/egreso/${id}`;
    return this.http.delete<any>(dir, id);
  }

  createEgresoIndividual(form:any){
    let dir = `${this.URL}/egreso`;
    return this.http.post(dir, form)
  }

  getAllArticulos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/articulos`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getCompraOfArticulo(id:string){
    let dir = `${this.URL}/searchCompra/${id}`;
    return this.http.get<any>(dir);
  }

  getSingleSalida(id: any): Observable<any> {
    let dir = `${this.URL}/egreso/${id}`;
    return this.http.get<any>(dir)
  }

  getAllFuncionarios(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/users`;
    const header = this.headers;
    // console.log(dir);
    return this.http.get<any>(dir, { headers: header });
  }

  editSalida(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/egreso/${id}`;
    return this.http.put<any>(dir, form)
  }

}
