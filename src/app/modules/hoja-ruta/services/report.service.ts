import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  /*Servicios para Users*/

  getAllUsers(): Observable<any> {
    let dir = `${this.URL}/users`;
    return this.http.get<any>(dir)
      .pipe(map(data => {
        // console.log(data.serverResponse);
        return data.serverResponse
      }))


  }

  addUser(form: any): Observable<any> {
    let dir = `${this.URL}/users`;
    return this.http.post<any>(dir, form)
    // .pipe( map( data => {
    //   return data.serverResponse
    // } ) )
  }

  getSingleUser(id: any): Observable<any> {
    let dir = `${this.URL}/user/${id}`;
    console.log(dir)
    return this.http.get<any>(dir);
  }


  getAllSeguimientos(destino?: string, estado?: string, del?: any, al?: any): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&estado=${estado}&dategt=${del}&datelt${al}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }
}
