import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) { }

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


  getAllCatProgras(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/catProg`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllProveedores(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/proveedores`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllFuncionarios(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/users`;
    const header = this.headers;
    // console.log(dir);
    return this.http.get<any>(dir, { headers: header });
  }

  getAllIngresos(limit?: number, skip?: number, idProve?: string, concepto?:string, numeroEntrada?:any, del?:any, al?:any): Observable<any[]> {
    let dir = `${this.URL}/ingresos?limit=${limit}&skip=${skip}&idProve=${idProve}&concepto=${concepto}&numeroEntrada=${numeroEntrada}&del=${del}&al=${al}`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllVehiculos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/vehiculos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }



  searchIngreso(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchingreso/${termino}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  searchArticulo(termino: any): Observable<any[]> {
    const encoded = encodeURIComponent(termino);
    var dir = `${this.URL}/searchArticulo/${encoded}`;
    console.log(encoded);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  getArticulo(termino: any): Observable<any[]> {
    var dir = `${this.URL}/articuloNombre/?nombre=${termino}`;
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }



  createIngreso(form: any): Observable<any> {
    let dir = `${this.URL}/ingreso`;
    return this.http.post<any>(dir, form);
  }


  editIngreso(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/ingreso/${id}`;
    return this.http.put<any>(dir, form)
  }

  deleteIngreso(id: any) {
    let dir = `${this.URL}/ingreso/${id}`;
    return this.http.delete<any>(dir, id);
  }


  getIngreso(id: any): Observable<any> {
    let dir = `${this.URL}/ingreso/${id}`;
    return this.http.get<any>(dir)
  }

  createEgreso(id: any) {
    let dir = `${this.URL}/egresoya/${id}`;
    return this.http.get(dir)
  }

  // createSalida(form: any): Observable<any> {
  //   let dir = `${this.URL}/egresoya`;
  //   return this.http.post<any>(dir, form);
  // }

  createSalida(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/egresoya/${id}`;
    return this.http.put<any>(dir, form)
  }

  getSingleCompra(id: any): Observable<any> {
    let dir = `${this.URL}/ingreso/${id}`;
    return this.http.get<any>(dir)
  }


}
