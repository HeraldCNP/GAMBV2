import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private readonly URL = environment.api;
  constructor(private http:HttpClient) { }


  /*Servicios para Seguimientos*/
  getAllSeguimientos(destino?:string, estado?:string, limit?:number, skip?:number, order?:string): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&estado=${estado}&limit=${limit}&skip=${skip}`;
    return this.http.get<any>(dir)
    .pipe( map( data => {
      return data.serverResponse
    } ) )
  }


  getHr(id: string): Observable<any> {
    let dir = `${this.URL}/hoja/${id}`;
    return this.http.get<any>(dir)
    .pipe( map( data => {
      return data.serverResponse
    } ) )
  }

  getSegui(id: string): Observable<any> {
    let dir = `${this.URL}/segui/${id}`;
    return this.http.get<any>(dir);
  }

  getUserPost(post: string): Observable<any> {
    let dir = `${this.URL}/user/${post}`;
    return this.http.get<any>(dir)
    .pipe( map( data => {
      return data.serverResponse
    } ) )
  }
}
