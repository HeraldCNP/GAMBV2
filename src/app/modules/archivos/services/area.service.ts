import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  getAllAreas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/areas?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createArea(form: any): Observable<any> {
    let dir = `${this.URL}/area`;
    return this.http.post<any>(dir, form);
  }

  editArea(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/area/${id}`;
    return this.http.put<any>(dir, form)
  }

  searchProveedor(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProveedor/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteArea(id: any) {
    let dir = `${this.URL}/area/${id}`;
    return this.http.delete<any>(dir, id);
  }

  // deleteTipo(id: any, tipo:any) {
  //   let dir = `${this.URL}/removeTipo/${id}`;
  //   return this.http.delete<any>(dir, id);
  // }


  deleteTipo(form: any, id:any): Observable<any> {
    let dir = `${this.URL}/removeTipo/${id}`;
    console.log(form);
    return this.http.put<any>(dir, form);
  }

  createTipo(form: any, id:any): Observable<any> {
    let dir = `${this.URL}/addTipo/${id}`;
    console.log(dir);

    return this.http.put<any>(dir, form);
  }


}
