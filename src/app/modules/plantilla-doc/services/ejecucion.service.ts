import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjecucionService {
  private readonly URL = environment.api;
  private http = inject(HttpClient)
  constructor() { }

    /*Servicios para Documentos de Normativas*/

    getAllDocEjecucion(): Observable<any[]> {
      let dir = `${this.URL}/ejecucions`;
      console.log(dir)
      return this.http.get<any[]>(dir)
    }



    createEjecucion(form: any): Observable<any> {
      let dir = `${this.URL}/ejecucion`;
      return this.http.post<any>(dir, form);
    }

    changeEstadoDocNormativa(id: any, fd: FormData): Observable<any> {
      let dir = `${this.URL}/uploadNormativa/${id}`;
      console.log(dir)
      return this.http.post<any>(dir, fd)
    }

    editarEjecucion(fd: FormData, id: string): Observable<any> {
      let dir = `${this.URL}/ejecucion/${id}`;
      return this.http.put<any>(dir, fd)
    }

    deleteEjecucion(id: any): Observable<any> {
      let dir = `${this.URL}/ejecucion/${id}`;
      return this.http.delete<any>(dir, id)
    }

    addArchivo(fd: FormData, id:string): Observable<any> {
      let dir = `${this.URL}/addEjecucionFile/${id}`;
      return this.http.put<any>(dir, fd)
    }

    deleteDocEjecucion(id: any): Observable<any> {
      let dir = `${this.URL}/ejecucionFile/${id}`;
      return this.http.delete<any>(dir, id)
    }


    /*END Servicios para Documentos de Normativas*/
}
