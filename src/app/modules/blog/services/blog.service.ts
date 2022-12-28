import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly URL = environment.api;
  // private readonly URL = 'http://192.168.1.120:8000/api';
  
  constructor(private http:HttpClient) { }
  /*Servicios para Slider*/
  getAllSliders():Observable<any[]>{
    let dir = `${this.URL}/slaider`;
    return this.http.get<any[]>(dir)
  }

  sendSlider(fd: FormData):Observable<any>{
    let dir = `${this.URL}/uploadslider`;
    return this.http.post<any>(dir, fd)
  }

  getSingleSlider(id:any):Observable<any>{
    let dir = `${this.URL}/slaider/${id}`;
    return this.http.get<any>(dir)
  }

  sendUpdateSlider(fd: FormData, id:any):Observable<any>{
    let dir = `${this.URL}/uploadslider/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteSlider(id:any):Observable<any>{
    let dir = `${this.URL}/slaider/${id}`;
    return this.http.delete<any>(dir, id)
  }

  changeEstadoSlider(id:any, fd: FormData):Observable<any>{
    let dir = `${this.URL}/slaider/${id}`;
    console.log(dir)
    return this.http.put<any>(dir, fd)
  }
  /*Finish Servicios para Slider*/

  /*Servicios para Post*/
  getAllPosts():Observable<any[]>{
    let dir = `${this.URL}/blogs`;
    return this.http.get<any[]>(dir)
  }

  getAllCategories():Observable<any[]>{
    let dir = `${this.URL}/category`;
    return this.http.get<any[]>(dir)
  }

  registerPost(fd: FormData):Observable<any>{
    let dir = `${this.URL}/uploadpost`;
    console.log(fd.get('image'))
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  getSinglePost(id:any):Observable<any>{
    let dir = `${this.URL}/blogid/${id}`;
    return this.http.get<any>(dir)
  }

  sendUpdatePost(fd: FormData, id:any):Observable<any>{
    let dir = `${this.URL}/uploadpost/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteImage(id:any):Observable<any>{
    let dir = `${this.URL}/imgpost/${id}`;
    return this.http.delete<any>(dir, id)
  }


  deletePost(id:any):Observable<any>{
    let dir = `${this.URL}/blog/${id}`;
    return this.http.delete<any>(dir, id)
  }

  changeEstado(id:any, fd: FormData):Observable<any>{
    let dir = `${this.URL}/blog/${id}`;
    console.log(dir)
    return this.http.put<any>(dir, fd)
  }

  /*Finish Servicios para Post*/

  /*Servicios para Categoria*/
  sendCategory(category:any):Observable<any>{
    let dir = `${this.URL}/category`;
    return this.http.post<any>(dir, category)
  }
  
  deleteCategory(id:any):Observable<any>{
    let dir = `${this.URL}/category/${id}`;
    return this.http.delete<any>(dir, id)
  }
  /*Finish Servicios para Categoria*/


  /*Servicios para Gaceta*/
  registerGaceta(fd: FormData):Observable<any>{
    let dir = `${this.URL}/uploadgaceta`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  editarGaceta(fd: FormData, id:string):Observable<any>{
    let dir = `${this.URL}/uploadgaceta/${id}`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  getAllGacetas():Observable<any[]>{
    let dir = `${this.URL}/gacetas`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }



  getGaceta(id:any):Observable<any>{
    let dir = `${this.URL}/gaceta/${id}`;
    return this.http.get<any>(dir)
  }

  deleteGaceta(id:any):Observable<any>{
    let dir = `${this.URL}/gaceta/${id}`;
    return this.http.delete<any>(dir, id)
  }


}