import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  private readonly URL = environment.api;
  constructor(private http:HttpClient) { }
  /*Services for Representante*/
  crearRepresentante(form:any):Observable<any>{
    let dir = `${this.URL}/repres`;
    return this.http.post<any>(dir, form)
  }

  getAllRepresentantes():Observable<any[]>{
    let dir = `${this.URL}/repres`;
    return this.http.get<any[]>(dir)
  }
  getSingleRepresentante(id:any):Observable<any>{
    let dir = `${this.URL}/repres/${id}`;
    return this.http.get<any>(dir) 
  }

  editarRepresentante(form:any, id:any):Observable<any>{
    let dir = `${this.URL}/repres/${id}`;
    return this.http.put<any>(dir, form)
  }

  deleteRepresentante(id:any):Observable<any>{
    let dir = `${this.URL}/repres/${id}`;
    return this.http.delete<any>(dir, id)
  }
  /*End Services for Representante*/

  /*Services for Entidad*/
  getAllEntidades():Observable<any[]>{
    let dir = `${this.URL}/entidad`;
    return this.http.get<any[]>(dir)
  }
  
  getSingleEntidad(id:any):Observable<any>{
    let dir = `${this.URL}/entidad/${id}`;
    return this.http.get<any>(dir) 
  }

  crearEntidad(form:any):Observable<any>{
    let dir = `${this.URL}/entidad`;
    console.log(form)
    return this.http.post<any>(dir, form)
  }

  editarEntidad(form:any, id:any):Observable<any>{
    let dir = `${this.URL}/entidad/${id}`;
    return this.http.put<any>(dir, form)
  }

  deleteEntidad(id:any):Observable<any>{
    let dir = `${this.URL}/entidad/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*End Services for Entidad*/

    /*Services for Convenios*/ 

    crearConvenio(form:any):Observable<any>{
      let dir = `${this.URL}/convenio`;
      return this.http.post<any>(dir, form)
    }
  
    getAllConvenios():Observable<any[]>{
      let dir = `${this.URL}/convenio`;
      return this.http.get<any[]>(dir)
    }

    getSingleConvenio(id:any):Observable<any>{
      let dir = `${this.URL}/convenio/${id}`;
      return this.http.get<any>(dir) 
    }

    addFile(fd: FormData, id:any):Observable<any>{
      let dir = `${this.URL}/uploadconvenio/${id}`;
      // console.log(fd.get('typefile'))
      return this.http.post<any>(dir, fd, {
        reportProgress: true,
        observe: 'events',
      })
    }

    addTransfe(fd: FormData, id:any):Observable<any>{
      let dir = `${this.URL}/addtransferencia/${id}`;
      // console.log(fd.get('typefile'))
      return this.http.post<any>(dir, fd, {
        reportProgress: true,
        observe: 'events',
      })
    }

    
    /*End Services for Convenios*/ 
}
