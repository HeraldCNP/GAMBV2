import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articulo } from '../interfaces/articulo';
import { catProgra } from '../interfaces/catProgra.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlmacenService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient, private authService: AuthService) { }

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

  /*Servicios para Categorias*/
  getAllCategorias(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/categoria?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createCategoria(form: any): Observable<any> {
    let dir = `${this.URL}/categoria`;
    return this.http.post<any>(dir, form);
  }

  searchCategoria(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchCat/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  searchSegCategoria(termino: any): Observable<any> {
    let dir = `${this.URL}/searchSegPoa/${termino}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteCategoria(id: any) {
    let dir = `${this.URL}/categoria/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Servicios para Categorias*/

  /*Programas */
  getAllProgramas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/programas?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getSinglePrograma(id: any): Observable<any> {
    let dir = `${this.URL}/programa/${id}`;
    return this.http.get<any>(dir);
  }

  createPrograma(form: any): Observable<any> {
    let dir = `${this.URL}/programa`;
    return this.http.post<any>(dir, form);
  }

  searchPrograma(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProg/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deletePrograma(id: any) {
    let dir = `${this.URL}/programa/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Programas*/

  /*Proyectos */
  getAllProyectos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/proyectos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createProyecto(form: any): Observable<any> {
    let dir = `${this.URL}/proyecto`;
    return this.http.post<any>(dir, form);
  }

  searchProyecto(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProg/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteProyecto(id: any) {
    let dir = `${this.URL}/programa/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Actividades*/

  /* Proyectos */
  getAllActividades(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/actividades?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createActividad(form: any): Observable<any> {
    let dir = `${this.URL}/actividad`;
    return this.http.post<any>(dir, form);
  }

  searchActividad(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchActividad/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteActividad(id: any) {
    let dir = `${this.URL}/actividad/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Proyectos*/

  /* Proveedores */
  getAllProveedores(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/proveedores?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }
  getProveedores(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/proveedores`;
    console.log(dir);
    return this.http.get<any>(dir);
  }
  createProveedor(form: any): Observable<any> {
    let dir = `${this.URL}/proveedor`;
    return this.http.post<any>(dir, form);
  }


  editProveedor(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/proveedor/${id}`;
    return this.http.put<any>(dir, form)
  }

  searchProveedor(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProveedor/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteProveedor(id: any) {
    let dir = `${this.URL}/proveedor/${id}`;
    return this.http.delete<any>(dir, id);
  }


  /* End Proveedores */

  /* Articulos */
  // getAllArticulos(limit?: number, skip?: number): Observable<any[]> {
  //   let dir = `${this.URL}/articulos?limit=${limit}&skip=${skip}`;
  //   console.log(dir);
  //   return this.http.get<any>(dir);
  // }

  getAllArticulos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/articulos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllPartidas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/almPartidas`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createMedida(form: any): Observable<any> {
    let dir = `${this.URL}/medida`;
    return this.http.post<any>(dir, form);
  }

  createArticulo(form: any): Observable<any> {
    let dir = `${this.URL}/articulo`;
    return this.http.post<any>(dir, form);
  }

  deleteArticulo(id: any) {
    let dir = `${this.URL}/articulo/${id}`;
    return this.http.delete<any>(dir, id);
  }

  searchArticulo(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchArticulos/${termino}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  searchArticulo2(codigo: any): Observable<any[]> {
    let dir = `${this.URL}/articuloCod/${codigo}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  editArticulo(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/articulo/${id}`;
    return this.http.put<any>(dir, form)
  }



  /*End Articulos */
  /*Medidas */
  getAllMedidas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/medidas?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }
  deleteMedida(id: any) {
    let dir = `${this.URL}/medida/${id}`;
    return this.http.delete<any>(dir, id);
  }

  searchMedida(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchMedida/${termino}`;
    // console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  /*End Medidas */

  /*Vehiculos */

  getAllVehiculos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/vehiculos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createVehiculo(form:any){
    let dir = `${this.URL}/vehiculo`;
    const header = this.headers;
    return this.http.post(dir, form)
  }

  editVehiculo(form: any, id: any): Observable<any> {
    let dir = `${this.URL}/vehiculo/${id}`;
    return this.http.put<any>(dir, form)
  }

  /*Vehiculos END*/

  /*catProgras */
  getAllCatProgras(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/segPoas`;
    console.log(dir);
    return this.http.get<any>(dir);
  }


  getAllFuncionarios(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/users`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  getAllAreas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/org`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }

  createCatProgra(form: catProgra): Observable<any> {
    let dir = `${this.URL}/segPoa`;
    return this.http.post<any>(dir, form);
  }

  cerrarGestion(): Observable<any> {
    let dir = `${this.URL}/cierreGestion`;
    return this.http.get<any>(dir);
  }
  /*END catProgras */

}

