import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private readonly URL = environment.api;
  private http = inject(HttpClient)
  constructor() { }

    /*Servicios para Documentos de evaluaciones*/

    getAllEvaluaciones(): Observable<any[]> {
      let dir = `${this.URL}/evaluacions`;
      console.log(dir)
      return this.http.get<any[]>(dir)
    }

    createEvaluacion(form: any): Observable<any> {
      let dir = `${this.URL}/evaluacion`;
      return this.http.post<any>(dir, form);
    }

    changeEstadoDocNormativa(id: any, fd: FormData): Observable<any> {
      let dir = `${this.URL}/uploadNormativa/${id}`;
      console.log(dir)
      return this.http.post<any>(dir, fd)
    }

    editarEvaluacion(fd: FormData, id: string): Observable<any> {
      let dir = `${this.URL}/evaluacion/${id}`;
      return this.http.put<any>(dir, fd)
    }

    deleteEvaluacion(id: any): Observable<any> {
      let dir = `${this.URL}/evaluacion/${id}`;
      return this.http.delete<any>(dir, id)
    }

    addArchivo(fd: FormData, id:string): Observable<any> {
      let dir = `${this.URL}/addEvaluacionFile/${id}`;
      return this.http.put<any>(dir, fd)
    }

    deleteDocEvaluacion(id: any): Observable<any> {
      let dir = `${this.URL}/evaluacionFile/${id}`;
      return this.http.delete<any>(dir, id)
    }


    /*END Servicios para Documentos de evaluaciones*/
}
