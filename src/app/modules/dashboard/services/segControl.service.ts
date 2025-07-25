import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegControlService {
   private readonly URL = environment.api;
      private http = inject(HttpClient)
  constructor() { }
  getAllSegControl(): any {
    let dir = `${this.URL}/getSegControlAll`;
    console.log(dir)
    return this.http.get<any>(dir);
  }
   getAllSegControlAct(): any {
    let dir = `${this.URL}/getSegControlAll?estado=1`;
    console.log(dir)
    return this.http.get<any>(dir);
  }
  getAllSegControlById(id: string): any {
    let dir = `${this.URL}/segControl/${id}`;
    return this.http.get<any>(dir);
  }
  createSegControl(fd: FormData): any {
    let dir = `${this.URL}/uploadSegControl`;
    return this.http.post<any>(dir, fd);
  }
  editarSegControl(fd: FormData, id: string): any {
    let dir = `${this.URL}/uploadSegControl/${id}`;
    return this.http.post<any>(dir, fd);
  }
changeEstado(id: any, fd: FormData): any {
    let dir = `${this.URL}/uploadSegControl/${id}`;
    return this.http.post<any>(dir, fd);
  }

  deleteSegControl(id: any): any {
    let dir = `${this.URL}/segControl/${id}`;
    return this.http.delete<any>(dir, id);
  }
}
