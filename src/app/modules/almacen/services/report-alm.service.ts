import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportAlmService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  getAllCatProgras(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/catProg`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllEntradas(catProgra?: string, codigo?: string, del?: any, al?: any): Observable<any> {
    let dir = `${this.URL}/searchCompraAll?catProgra=${catProgra}&codigo=${codigo}`;
    console.log(dir)
    return this.http.get<any>(dir)
  }


  getAllArticles(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/articulos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

}


