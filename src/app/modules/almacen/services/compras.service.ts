import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) {}


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
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllIngresos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/ingresos?limit=${limit}&skip=${skip}`;
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
    let dir = `${this.URL}/searchArticulo/${termino}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }



  createIngreso(form: any): Observable<any> {
    let dir = `${this.URL}/ingreso`;
    return this.http.post<any>(dir, form);
  }


  editIngreso(form:any, id:any):Observable<any>{
    let dir = `${this.URL}/ingreso/${id}`;
    return this.http.put<any>(dir, form)
  }

  deleteIngreso(id: any) {
    let dir = `${this.URL}/proveedor/${id}`;
    return this.http.delete<any>(dir, id);
  }


  getIngreso(id: any): Observable<any> {
    let dir = `${this.URL}/ingreso/${id}`;
    return this.http.get<any>(dir)
  }

}
