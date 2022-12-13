import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListSliderI } from '../../blog/models/listSlider.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  getAllSliders():Observable<ListSliderI[]>{
    let dir = `${this.URL}/slaider`;
    return this.http.get<ListSliderI[]>(dir)
  }

  getAllPosts():Observable<any[]>{
    let dir = `${this.URL}/blogs?limit=3`;
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


}


