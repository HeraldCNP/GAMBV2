import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catProgra } from '../interfaces/catProgra.interface';

@Injectable({
  providedIn: 'root'
})
export class ValeService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }


  getCompraOfCombustible(id:string, catProgra:any){
    let dir = `${this.URL}/searchCombustible/${id}/${catProgra}`;
    return this.http.get<any>(dir);
    console.log(dir);
  }

  createVale(form:any){
    let dir = `${this.URL}/vale`;
    return this.http.post(dir, form)
  }

  getAllVales(){
    let dir = `${this.URL}/vales`;
    return this.http.get<any>(dir);
  }

  getAllAutorizaciones(){
    let dir = `${this.URL}/listAutorizacion`;
    return this.http.get<any>(dir);
  }


}
