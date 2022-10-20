import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  private readonly URL = environment.api;
  constructor(private http:HttpClient) { }

  crearRepresentante(form:any):Observable<any>{
    let dir = `${this.URL}/repres`;
    return this.http.post<any>(dir, form)
  }

  getAllRepresentantes():Observable<any[]>{
    let dir = `${this.URL}/repres`;
    return this.http.get<any[]>(dir)
  }
  getSingleRepresentante(id:any):Observable<any>{
    let dir = `${this.URL}/repres/${id}`;
    return this.http.get<any>(dir) 
  }

  editarRepresentante(form:any, id:any):Observable<any>{
    let dir = `${this.URL}/repres/${id}`;
    return this.http.put<any>(dir, form)
  }

  deleteRepresentante(id:any):Observable<any>{
    let dir = `${this.URL}/repres/${id}`;
    return this.http.delete<any>(dir, id)
  }
}
