import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllSliders():Observable<any[]>{
    let dir = `${this.URL}/slaider`;
    return this.http.get<any[]>(dir)
  }

  getAllPosts():Observable<any[]>{
    let dir = `${this.URL}/blogs?limit=3&status=true`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  getSinglePost(id:any):Observable<any>{
    let dir = `${this.URL}/blog/${id}`;
    return this.http.get<any>(dir)
  }

  getAllCategories():Observable<any[]>{
    let dir = `${this.URL}/category`;
    return this.http.get<any[]>(dir)
  }

  getNoticias(name:any):Observable<any[]>{
    let dir = `${this.URL}/blogs?category=${name}`;
    return this.http.get<any[]>(dir)
  }


  getAllGacetas():Observable<any[]>{
    let dir = `${this.URL}/gacetas?estado=true`;
    // console.log(dir)
    return this.http.get<any[]>(dir)
  }

  getGacetas(titulo:any):Observable<any[]>{
    let dir = `${this.URL}/gacetas?titulo=${titulo}&estado=true`;
    // console.log(dir)
    return this.http.get<any[]>(dir)
  }

  searchGaceta(termino:any):Observable<any[]>{
    let dir = `${this.URL}/searchgaceta/${termino}`;
    // console.log(dir)
    return this.http.get<any[]>(dir)
  }

  getAllPoas():Observable<any[]>{
    let dir = `${this.URL}/poas?estado=true`;
    // console.log(dir)
    return this.http.get<any[]>(dir)
  }

  getAllRendiciones():Observable<any[]>{
    let dir = `${this.URL}/rendiciones?estado=true`;
    // console.log(dir)
    return this.http.get<any[]>(dir)
  }

  /* Contador */
  getCounterValue():Observable<number> {
    return this.http.get<number>('/api/counter');
    // return 2;
  }

  incrementCounterValue() {
    this.getCounterValue().subscribe(value => {
      const newValue = value + 1;
      // this.http.put('/api/counter', { value: newValue }).subscribe(() => {
      //   this.cookieService.set('visits', newValue.toString());
      // });
      return newValue;
    });

  }

  /* End Contador */
}


