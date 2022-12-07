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

  selectEnti(codigo:any):Observable<any>{
    let dir = `${this.URL}/entityCod/${codigo}`;
    return this.http.get<any>(dir)
  }

  addEntidad(form:any):Observable<any>{
    let dir = `${this.URL}/entity`;
    console.log(form)
    return this.http.post<any>(dir, form)
  }

  crearEntidad(form:any):Observable<any>{
    let dir = `${this.URL}/entidad`;
    console.log(form)
    return this.http.post<any>(dir, form)
  }

  addrepresentante(form:any, id:any):Observable<any>{
    let dir = `${this.URL}/addrepresentante/${id}`;
    return this.http.put<any>(dir, form)
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
      let dir = `${this.URL}/convenios`;
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
      console.log(fd.get('comprobante'))
      return this.http.post<any>(dir, fd, {
        reportProgress: true,
        observe: 'events',
      })
    }

    filtrarConvenios(search?:string):Observable<any>{
      let dir = `${this.URL}/searchconvenio/${search}`;
      // console.log(dir)
      return this.http.get<any>(dir)
    }


    editarConvenio(form:any, id:any):Observable<any>{
      let dir = `${this.URL}/convenio/${id}`;
      return this.http.put<any>(dir, form)
    }

    editarEstado(form:any, id:any):Observable<any>{
      let dir = `${this.URL}/editarestado/${id}`;
      return this.http.put<any>(dir, form)
    }

    addfinanc(form:any, id:any):Observable<any>{
      let dir = `${this.URL}/addfinanc/${id}`;
      console.log(dir)
      return this.http.post<any>(dir, form)
    }


    deleteConvenio(id:any):Observable<any>{
      let dir = `${this.URL}/convenio/${id}`;
      return this.http.delete<any>(dir, id)
    }
    

    getAllPartidas(){
      let dir = `${this.URL}/partidas`;
      return this.http.get<any[]>(dir)
    }
    /*End Services for Convenios*/ 
}
