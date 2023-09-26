import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) {
  }

  /* Carpetas */
  getAllConta(limit?: number, skip?: number, area?: string, tipo?: string, subTipo?: string): Observable<any[]> {
    let dir = `${this.URL}/carpetas?limit=${limit}&skip=${skip}&area=${area}&tipo=${tipo}&subTipo=${subTipo}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }
  getAllCarpetasConta(area?: string, tipo?: string, subTipo?: string): Observable<any[]> {
    let dir = `${this.URL}/carpetas?area=${area}&tipo=${tipo}&subTipo=${subTipo}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createConta(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/addArea/${id}`;
    return this.http.put<any>(dir, form)
  }

  registerPreven(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/addAreaArch/${id}`;
    // console.log(fd);
    return this.http.put<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  getSingleCarpeta(id: any): Observable<any> {
    let dir = `${this.URL}/carpeta/${id}`;
    return this.http.get<any>(dir);
  }


  /* Archivos */
  getAllArchivos(limit?: number, skip?: number, area?: string): Observable<any[]> {
    let dir = `${this.URL}/contabilidades?limit=${limit}&skip=${skip}&area=${area}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  searchArchivo(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchConta/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  getSingleArchivo(id: any): Observable<any> {
    let dir = `${this.URL}/contabilidad/${id}`;
    return this.http.get<any>(dir)
  }


  editArchivo(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/contabilidad/${id}`;
    return this.http.put<any>(dir, form)
  }

  moverArchivo(fd: any, id: string): Observable<any> {
    let dir = `${this.URL}/removeArchivo/${id}`;
    // console.log(dir);
    return this.http.put<any>(dir, fd)
  }

  addArchivo(fd: any, id: string): Observable<any> {
    let dir = `${this.URL}/addArchivo/${id}`;
    // console.log(dir);
    return this.http.put<any>(dir, fd)
  }

  getAllArchivosSin(): Observable<any[]> {
    let dir = `${this.URL}/getArchivosSin`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  deleteArchivo(id: any) {
    let dir = `${this.URL}/contabilidad/${id}`;
    return this.http.delete<any>(dir, id);
  }

  buscarArchivos(area?: string, tipo?: string, subTipo?: string, gestion?: number, glosa?: string, beneficiario?: string, numero?: string, ci?: string): Observable<any[]> {
    let dir = `${this.URL}/searchContaAll?area=${area}&tipo=${tipo}&subTipo=${subTipo}&gestion=${gestion}&glosa=${glosa}&beneficiario=${beneficiario}&numero=${numero}&ci=${ci}`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

}
