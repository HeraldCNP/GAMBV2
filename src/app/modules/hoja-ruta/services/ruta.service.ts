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
  getAllSeguimientos(destino?:string, estado?:string, dategt?:any,datelt?:any, limit?:number, skip?:number, nuit?:string): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&estado=${estado}&dategt=${dategt}&datelt=${datelt}&limit=${limit}&skip=${skip}&nuit=${nuit}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }
/*   getTotalSeguimientos(destino?:string, estado?:string, dategt?:any,datelt?:any): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&estado=${estado}&dategt=${dategt}&datelt=${datelt}`;
    return this.http.get<any>(dir)
  } */
  getTotalSeguimientos(destino?:string, dategt?:any,datelt?:any): Observable<any> {
    let dir = `${this.URL}/seguiTotales?destino=${destino}&dategt=${dategt}&datelt=${datelt}`;
    return this.http.get<any>(dir)
  }
  getPendientes(destino?:string, estado?:string, dategt?:any,datelt?:any): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&estado=${estado}&dategt=${dategt}&datelt=${datelt}`;
    return this.http.get<any>(dir)
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


  eliminarSegui(id: string): Observable<any> {
    return this.http.delete(this.URL + '/segui/' + id);
  }
  eliminarArc(id: string): Observable<any> {
    return this.http.delete(this.URL + '/arch/' + id);
  }

  EditarSegui(id: string, segui:Segui): Observable<any> {
    return this.http.put(this.URL + '/segui/' + id, segui);
  }
  
  EditarSeguis(id: string, segui:Segui): Observable<any> {
    return this.http.put(this.URL + '/seguis/' + id, segui);
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

  getAllHojaRuta(nuit?:string, origen?:string, dategt?:any,datelt?:any, limit?:number, skip?:number, order?:string): Observable<any> {
    let dir = `${this.URL}/hojaruta?nuit=${nuit}&origen=${origen}&dategt=${dategt}&datelt=${datelt}&limit=${limit}&skip=${skip}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }

  buscarHoja(search: string): Observable<any> {
    return this.http.get(this.URL + '/hojasearch/' + search);
  }
  getTotalHojaRuta(dategt?:any,datelt?:any): Observable<any> {
    let dir = `${this.URL}/totales?dategt=${dategt}&datelt=${datelt}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }

  obtenerOrg(params: string): Observable<any> {
    return this.http.get(this.URL + '/org/' + params).pipe( map( data => {
      return data
    } ) )
  }
  obtenerSubUni(params: string): Observable<any> {
    return this.http.get(this.URL + '/subdir/' + params).pipe( map( data => {
      return data
    } ) )
  }
  busacrnuit(nuit: string): Observable<any> {
    return this.http.get(this.URL + '/asociar/' + nuit);
  }
  Asociar(nuit: string, hoja:Hojaruta): Observable<any> {
    return this.http.put(this.URL + '/asociar/' + nuit, hoja);
  }
  EditarSeguiaso(nuit: string, segui:Segui): Observable<any> {
    return this.http.put(this.URL + '/seguiaso/' + nuit, segui);
  }
  eliminarHoja(id: string): Observable<any> {
    return this.http.delete(this.URL + '/hoja/' + id);
  }
  addArch(id: string, segui:Segui): Observable<any> {
    return this.http.put(this.URL + '/addarch/' + id, segui);
  }
}
