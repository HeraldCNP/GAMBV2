import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private readonly URL = environment.api;
    private http = inject(HttpClient)
  constructor() { }

  getAllPedidos(): any {
    let dir = `${this.URL}/pedidos`;
    console.log(dir)
    return this.http.get<any>(dir);
  }
  getAllPedidosById(id: string): any {
    let dir = `${this.URL}/pedidos/${id}`;
    return this.http.get<any>(dir);
  }
  createPedido(fd: FormData): any {
    let dir = `${this.URL}/pedido`;
    return this.http.post<any>(dir, fd);
  }
  editarPedido(fd: FormData, id: string): any {
    let dir = `${this.URL}/pedidos/${id}`;
    return this.http.put<any>(dir, fd);
  }
  deletePedido(id: any): any {
    let dir = `${this.URL}/pedidos/${id}`;
    return this.http.delete<any>(dir, id);
  }
 
}
