import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get token(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    return token;
  }
  get headers() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return headers;
  }

  /*Servicios para Users*/

  getAllUsers(): Observable<any> {
    let dir = `${this.URL}/users`;
    const header = this.headers;
    return this.http.get<any>(dir, { headers: header })
      .pipe(map(data => {
        // console.log(data.serverResponse);
        return data.serverResponse
      }))
  }

  getAllCargos(): Observable<any> {
    let dir = `${this.URL}/subdir`;
    const header = this.headers;
    return this.http.get<any>(dir, { headers: header })
      .pipe(map(data => {
        // console.log(data);
        return data
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


  getAllSeguimientos(destino?: string, recibidox?: string, estado?: string, del?: any, al?: any): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&recibidox=${recibidox}&estado=${estado}&dategt=${del}&datelt=${al}`;
    const header = this.headers;
    console.log(dir)
    return this.http.get<any>(dir, { headers: header })
  }

  getAllSeguimientos2(destino?: string, estado?: string, del?: any, al?: any): Observable<any> {
    let dir = `${this.URL}/oficina?destino=${destino}&estado=${estado}&dategt=${del}&datelt=${al}`;
    const header = this.headers;
    console.log(dir)
    return this.http.get<any>(dir, { headers: header })
  }
}
