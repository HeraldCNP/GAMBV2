import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportAlmService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  getAllCatProgras(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/catProg`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllEntradas(catProgra?: string, idProducto?: string, estadoCompra?: string, del?: any, al?: any): Observable<any> {
    let dir = `${this.URL}/searchCompraAll?catProgra=${catProgra}&idProducto=${idProducto}&estadoCompra=${estadoCompra}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }

  getAllArticulos(idPartida?: string, unidadDeMedida?: string, codigo?: string, nombre?: string, cantidad?: string, stock?: any): Observable<any> {
    let dir = `${this.URL}/searchArticulosAll?idPartida=${idPartida}&unidadDeMedida=${unidadDeMedida}&codigo=${codigo}&nombre=${nombre}&cantidad=${cantidad}&stock=${stock}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }



  getAllArticles(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/articulos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getCantidades(){
    let dir = `${this.URL}/countAlmacenes`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllPartidas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/almPartidas?limit=${limit}&skip=${skip}`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllMedidas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/medidas?limit=${limit}&skip=${skip}`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllCompras(catProgra?: string, del?: any, al?: any): Observable<any[]> {
    let dir = `${this.URL}/compras?catProgra=${catProgra}&del=${del}&al=${al}`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  getVales(params?: any): Observable<any> {
    const url = `${this.URL}/valesReport`;
    // console.log(params);

    // const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(url, { params: httpParams });

  }




}


