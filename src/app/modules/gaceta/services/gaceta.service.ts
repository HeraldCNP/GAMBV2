import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GacetaService {

  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }

  /*Servicios para Gaceta*/
  registerGaceta(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadgaceta`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  editarGaceta(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadgaceta/${id}`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  getAllGacetas(): Observable<any[]> {
    let dir = `${this.URL}/gacetas`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  changeEstado(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/gaceta/${id}`;
    console.log(dir)
    return this.http.put<any>(dir, fd)
  }

  getGaceta(id: any): Observable<any> {
    let dir = `${this.URL}/gaceta/${id}`;
    return this.http.get<any>(dir)
  }

  deleteGaceta(id: any): Observable<any> {
    let dir = `${this.URL}/gaceta/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*End Servicios para Gaceta*/

  /*Servicios para POA*/

  getAllPoas(): Observable<any[]> {
    let dir = `${this.URL}/poas`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerPoa(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadpoa`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  addFile(id: string, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadpoa/${id}`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  getPoa(id: any): Observable<any> {
    let dir = `${this.URL}/poa/${id}`;
    return this.http.get<any>(dir)
  }


  editarPoa(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadpoa/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deletePoa(id: any): Observable<any> {
    let dir = `${this.URL}/poa/${id}`;
    return this.http.delete<any>(dir, id)
  }

  changeEstadoPoa(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadpoa/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }


  deleteDocumentoPoa(id: any): Observable<any> {
    let dir = `${this.URL}/archivoPoa/${id}`;
    return this.http.delete<any>(dir, id)
  }
  /*End Servicios para POA*/

  /*Servicios para Rendicion de Cuentas*/
  getAllRendiciones(): Observable<any[]> {
    let dir = `${this.URL}/rendiciones`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerRendiciones(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadrendicion`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  changeEstadoRendicion(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadrendicion/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }

  editarRendicion(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadrendicion/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteRendicion(id: any): Observable<any> {
    let dir = `${this.URL}/rendicion/${id}`;
    return this.http.delete<any>(dir, id)
  }


  /*End Servicios para Rendicion de Cuentas*/

  /*Servicios para PTDI*/
  getAllPtdis(): Observable<any[]> {
    let dir = `${this.URL}/ptdis`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerPtdi(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadptdi`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  changeEstadoPtdi(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadptdi/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }

  editarPtdi(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadptdi/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deletePtdi(id: any): Observable<any> {
    let dir = `${this.URL}/ptdi/${id}`;
    return this.http.delete<any>(dir, id)
  }
  /*End Servicios para PTDI*/

  /*Servicios para PEI*/

  getAllPeis(): Observable<any[]> {
    let dir = `${this.URL}/peis`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerPei(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadPei`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  changeEstadoPei(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadPei/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }

  editarPei(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadPei/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deletePei(id: any): Observable<any> {
    let dir = `${this.URL}/pei/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*END Servicios para PEI*/

  /*Servicios para Reglamentos*/

  getAllReglamentos(): Observable<any[]> {
    let dir = `${this.URL}/reglamentos`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerReglamento(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadReglamento`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  changeEstadoReglamento(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadReglamento/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }

  editarReglamento(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadReglamento/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteReglamento(id: any): Observable<any> {
    let dir = `${this.URL}/reglamento/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*END Servicios para Reglamentos*/

  /*Servicios para Auditoria*/

  getAllAuditorias(): Observable<any[]> {
    let dir = `${this.URL}/auditorias`;
    console.log(dir)
    return this.http.get<any[]>(dir)
  }

  registerAuditoria(fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadAuditoria`;
    return this.http.post<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
  }

  changeEstadoAuditoria(id: any, fd: FormData): Observable<any> {
    let dir = `${this.URL}/uploadAuditoria/${id}`;
    console.log(dir)
    return this.http.post<any>(dir, fd)
  }

  editarAuditoria(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/uploadAuditoria/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteAuditoria(id: any): Observable<any> {
    let dir = `${this.URL}/auditoria/${id}`;
    return this.http.delete<any>(dir, id)
  }

  /*END Servicios para Auditoria*/
}
