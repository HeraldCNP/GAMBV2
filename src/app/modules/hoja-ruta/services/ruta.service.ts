import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Segui } from '../models/seguimiento';
import { Hojaruta } from '../models/hojaruta';

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

  register(hoja: Hojaruta): Observable<any> {
    return this.http.post(this.URL + '/hoja/', hoja);
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

  EditarSegui(id: string, segui:Segui): Observable<any> {
    return this.http.put(this.URL + 'segui/' + id, segui);
  }
  
  EditarSeguis(id: string, segui:Segui): Observable<any> {
    return this.http.put(this.URL + 'seguis/' + id, segui);
  }
  obtenerHoja(id: string): Observable<any> {
    return this.http.get(this.URL + '/hoja/' + id);
  }
  EditarHoja(id: string, hoja:Hojaruta): Observable<any> {
    return this.http.put(this.URL + '/hoja/' + id, hoja);
  }
  
  buscarnuit(nuit: string): Observable<any> {
    return this.http.get(this.URL + '/seguias/' + nuit);
  }

  getAllHojaRuta(nuit?:string, origen?:string, limit?:number, skip?:number, order?:string): Observable<any> {
    let dir = `${this.URL}/hojaruta?nuit=${nuit}&origen=${origen}&limit=${limit}&skip=${skip}`;
    return this.http.get<any>(dir)
  }


  obtenerOrg(params: string): Observable<any> {
    return this.http.get(this.URL + '/org/' + params).pipe( map( data => {
      return data
    } ) )
  }
}
