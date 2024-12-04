import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catProgra } from '../interfaces/catProgra.interface';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';

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

  getAllVales(params?:any){
    let dir = `${this.URL}/vales`;
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(dir, { params: httpParams, headers: header});
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

  finalizarVales(form:any){
    let dir = `${this.URL}/finalizarVales`;
    const header = this.headers;
    return this.http.post(dir, form, { headers: header})
  }

  getSingleVale(id:string){
    let dir = `${this.URL}/vale/${id}`; 
    const header = this.headers;
    return this.http.get<any>(dir, { headers: header});
  }

  editVale(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/vale/${id}`;
    return this.http.put<any>(dir, form)
  }

}
