import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GacetaService {

  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  /*Servicios para Gaceta*/
  registerGaceta(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadgaceta`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  editarGaceta(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadgaceta/${id}`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  getAllGacetas(): Observable<any[]> {
    let dir = `${this.URL}/gacetas`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  changeEstado(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/gaceta/${id}`;
    console.log(dir)
    return this.http.put<any>(dir, fd)
  }

  getGaceta(id: any): Observable<any> {
    let dir = `${this.URL}/gaceta/${id}`;
    return this.http.get<any>(dir)
  }

  deleteGaceta(id: any): Observable<any> {
    let dir = `${this.URL}/gaceta/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*End Servicios para Gaceta*/

  /*Servicios para POA*/

  getAllPoas(): Observable<any[]> {
    let dir = `${this.URL}/poas`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerPoa(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadpoa`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  changeEstadoPoa(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadpoa/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }
  /*End Servicios para POA*/

  /*Servicios para PTDI*/
  getAllPtdis(): Observable<any[]> {
    let dir = `${this.URL}/ptdis`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerPtdi(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadptdi`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }
}
