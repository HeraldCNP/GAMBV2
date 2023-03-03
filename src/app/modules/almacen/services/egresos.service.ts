import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  getAllEgresos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/egresos?limit=${limit}&skip=${skip}`;
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
}
