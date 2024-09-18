import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catProgra } from '../interfaces/catProgra.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValeService {
  private readonly URL = environment.api;

  constructor(private http:HttpClient, private authService:AuthService) { }


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

  getCompraOfCombustible(id:string, catProgra:any){
    let dir = `${this.URL}/searchCombustible/${id}/${catProgra}`;
    const header = this.headers;
    return this.http.get<any>(dir, { headers: header});
    // console.log(dir);
  }

  createVale(form:any){
    let dir = `${this.URL}/vale`;
    const header = this.headers;
    return this.http.post(dir, form, { headers: header})
  }

  getAllVales(limit?: number, skip?: number){
    let dir = `${this.URL}/vales?limit=${limit}&skip=${skip}`;
        const header = this.headers;
    return this.http.get<any>(dir, { headers: header});
  }

  getAllAutorizaciones(){
    let dir = `${this.URL}/listAutorizacion`;
        const header = this.headers;
    return this.http.get<any>(dir, { headers: header});
  }

  cambiarEstado(id:string, form:any){
    let dir = `${this.URL}/vale/${id}`;
        const header = this.headers;
    return this.http.put<any>(dir, form, { headers: header});
  }

  deleteVale(id:string){  
    let dir = `${this.URL}/vale/${id}`; 
    const header = this.headers;
    return this.http.delete<any>(dir, { headers: header});
  }

}
