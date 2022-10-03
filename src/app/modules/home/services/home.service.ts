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
    let dir = `${this.URL}/blog`;
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
}

