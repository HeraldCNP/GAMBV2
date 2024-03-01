import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AutorizacionService } from '../../../services/autorizacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizacion-index',
  templateUrl: './autorizacion-index.component.html',
  styleUrls: ['./autorizacion-index.component.css']
})
export class AutorizacionIndexComponent {
  totalAutorizaciones: any = 0;
  autorizaciones: any = [];
  autorizacionesTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  autorizacionForm: any;
  editForm: any;
  archiForm: any;
  buscarForm: any;
  buscarAutorizacion: any;
  cargando: boolean = true;
  idAutorizacion: any;
  URL = environment.api;

  constructor(private autorizacionService: AutorizacionService, private router: Router,){

  }

  ngOnInit(): void {
    this.cargarAutorizaciones();
  }


  cargarAutorizaciones() {
    this.cargando = true;
    this.autorizacionService.getAllAutorizaciones()
      .subscribe((data: any) => {
        this.totalAutorizaciones = data.totalDocs;
        this.autorizaciones = data;
        this.autorizacionesTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }
    this.cargarAutorizaciones();
  }

  addAutorizacion(){
    this.router.navigate(['/actFijos/autorizacion/create'])
  }
}
