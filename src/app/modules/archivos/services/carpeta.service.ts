import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

   /* Carpetas */
   getAllCarpetas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/carpetas?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  registerCarpeta(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadCarpeta`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  createProveedor(form: any): Observable<any> {
    let dir = `${this.URL}/proveedor`;
    return this.http.post<any>(dir, form);
  }


  editProveedor(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/proveedor/${id}`;
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

  deleteProveedor(id: any) {
    let dir = `${this.URL}/proveedor/${id}`;
    return this.http.delete<any>(dir, id);
  }
}
