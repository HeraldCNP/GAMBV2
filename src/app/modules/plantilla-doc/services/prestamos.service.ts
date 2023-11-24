import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  private readonly URL = environment.api;
  private http = inject(HttpClient)
  constructor() { }

    /*Servicios para Documentos de Normativas*/

    getAllPrestamos(): Observable<any[]> {
      let dir = `${this.URL}/prestamos`;
      // console.log(dir)
      return this.http.get<any[]>(dir)
    }

    registerPrestamo(fd: FormData): Observable<any> {
      let dir = `${this.URL}/prestamo`;
      return this.http.post<any>(dir, fd)
    }

    addArchivo(fd: FormData, id:string): Observable<any> {
      let dir = `${this.URL}/addFilePrestamo/${id}`;
      return this.http.put<any>(dir, fd)
    }

    changeEstadoDocNormativa(id: any, fd: FormData): Observable<any> {
      let dir = `${this.URL}/uploadNormativa/${id}`;
      console.log(dir)
      return this.http.post<any>(dir, fd)
    }

    editarPrestamo(fd: FormData, id: string): Observable<any> {
      let dir = `${this.URL}/prestamo/${id}`;
      return this.http.put<any>(dir, fd)
    }

    deletePrestamo(id: any): Observable<any> {
      let dir = `${this.URL}/prestamo/${id}`;
      return this.http.delete<any>(dir, id)
    }

    deleteDocPrestamo(id: any): Observable<any> {
      let dir = `${this.URL}/filePrestamo/${id}`;
      return this.http.delete<any>(dir, id)
    }

    addAmortizacion(fd: FormData, id:string): Observable<any> {
      let dir = `${this.URL}/uploadAmortizacion/${id}`;
      console.log(dir);
      return this.http.put<any>(dir, fd)
    }

    deleteAmorti(id: any): Observable<any> {
      let dir = `${this.URL}/amortizacion/${id}`;
      return this.http.delete<any>(dir, id)
    }

    /*END Servicios para Documentos de Normativas*/
}
