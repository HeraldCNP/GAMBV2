import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private readonly URL = environment.api;
  constructor(private http: HttpClient) {

  }

  // getAllAutorizaciones(area?: string, tipo?: string, subTipo?: string): Observable<any[]> {
  //   let dir = `${this.URL}/autorizaciones?area=${area}&tipo=${tipo}&subTipo=${subTipo}`;
  //   console.log(dir);
  //   return this.http.get<any>(dir);
  // }

  getAllAutorizaciones(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/autorizaciones?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllUnidadSolicitante(): Observable<any[]> {
    let dir = `${this.URL}/subdir`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllVehiculos(): Observable<any[]> {
    let dir = `${this.URL}/vehiculos`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllConductores(): Observable<any[]> {
    let dir = `${this.URL}/listUsers?roles=CHOFER`;
    console.log(dir);
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


}
