import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  private readonly URL = environment.api;
  private http = inject(HttpClient)
  constructor() { }

  getAllModelos(): Observable<any[]> {
    let dir = `${this.URL}/modelos`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createModelo(form: any): Observable<any> {
    let dir = `${this.URL}/modelo`;
    return this.http.post<any>(dir, form);
  }

  editarModelo(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/modelo/${id}`;
    return this.http.put<any>(dir, fd)
  }

  deleteModelo(id: any): Observable<any> {
    let dir = `${this.URL}/modelo/${id}`;
    return this.http.delete<any>(dir, id)
  }


  /*Servicios para Documentos*/

  getAllDocumentos(): Observable<any[]> {
    let dir = `${this.URL}/documentos`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }


  registerDocumento(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadDocument`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }



  changeEstadoAuditoria(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadDocument/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }

  editarDocumento(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadDocument/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteDocumento(id: any): Observable<any> {
    let dir = `${this.URL}/document/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*END Servicios para Documentos*/
}
