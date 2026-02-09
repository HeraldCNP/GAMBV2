import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-conve-index',
  templateUrl: './conve-index.component.html',
  styleUrls: ['./conve-index.component.css']
})
export class ConveIndexComponent implements OnInit {
  convenios: any = [];
  URL = environment.api;
  search: any;
  cargando: boolean = true;
  destino: any = '';
  estado: string = '';
  nombre: string = '';
  limit: number = 10;
  skip: number = 1;
  page: number = 1;
  totalPages: any;
  finFecha:any;
  searchForm: any;
  entidades: any[] = [];
  constructor(
    private api: ConvenioService,
    private router: Router,
    private fb: FormBuilder,
  ) { 
    this.searchForm = this.fb.group({
      codigo: [''],
      conclusion: [],
      vencimiento: [''],
      convenio: [''],
      financiamiento: [],
      fechafin: [''],
      objeto: [''],
      estado: [],
      isActive: [],
      entidadFinan: [''],
    });
  }

  ngOnInit(): void {
    this.getConvenios()
    this.cargarEntidades();
  }

  addConvenio() {
    this.router.navigate(['convenio/convenio/create'])
  }

    cargarEntidades(params?: any) {
    this.api.queryEntidades(params).subscribe((data: any) => {
      this.entidades = data.entidades;
    });
  }

   resetFormSearch() {
    this.searchForm.reset({
      codigo: '',
      vencimiento: '',
      conclusion: '',
      convenio: '',
      financiamiento: '',
      fechafin: '',
      objeto: '',
      estado: '',
      isActive: '',
      entidadFinan: '',
    });
    this.getConvenios();
  }
  getConvenios(params?: any) {
    console.log('params', params);
    this.cargando = true;
    this.api.getAllConvenios(params).subscribe(
      res => {
        this.convenios = res;
        this.totalPages = res.totalpage;

        this.cargando = false;
        console.log("conves", this.convenios)
      }
    );
  }

 printEntidades(params?: any) {
    this.api.printEntidades(params).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // abre el PDF en nueva pestaña
    });
  }

  updateConvenio(id: string) {
    this.router.navigate(['convenio/convenio/update', id])
  }

  addFile(id: string) {
    this.router.navigate(['convenio/convenio/addFile', id])
  }

  addTransfe(id: string) {
    this.router.navigate(['convenio/convenio/addTransfe', id])
  }

  seeTransfe(id: string) {
    this.router.navigate(['convenio/convenio/seeTransfe', id])
  }

  deleteConvenio(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'La Entidad ha sido eliminada.',
          'success'
        )
        this.api.deleteConvenio(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getConvenios()
        );
      }
    })
  }


  sumarDias(fecha: any, dias: any) {
    let fechaFin = new Date(fecha)
    fechaFin.setDate(fechaFin.getDate() + dias);
    // console.log(fechaFin.toISOString());
    return fechaFin.toISOString();
  }

 calcDias(fechaFin: any) {
  if (!fechaFin) return null;   // ⛔ evita marcar vencido

  let hoy = new Date().getTime();
  let fin = new Date(fechaFin).getTime();
  let diff = fin - hoy;
  let restante = Math.ceil(diff / (1000 * 3600 * 24));

  if (restante < 0) {
    return 'vencido';
  }
  return restante;
}


  filtrarConvenios() {
    // this.estado = '';
    this.api
      .filtrarConvenios(
        this.search
      )
      .subscribe((data) => {
        this.convenios = data.serverResponse;
        console.log(this.convenios)
        // this.nuit = '';
        // this.totalSeguimientos = data.totalDocs;
        // this.totalPages = Math.ceil(this.totalSeguimientos / this.limit);
      });
  }


  changeStatus(id: string) {
    this.api.getSingleConvenio(id).subscribe(data => {
      //this.finFecha = this.sumarDias(data.firma, data.plazo)
    })
    Swal.fire({
      title: '¿Deseas aprobar este convenio?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, Aprobar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Aprobado!',
          'El Convenio ha sido aprobado.',
          'success'
        )
        
        let fd = new FormData();
        fd.append('estado', "SUSCRITO");
        //fd.append('fechafin', this.finFecha);
        //console.log(fd.get('fechafin'))
        this.api.editarEstado(fd, id).subscribe(
          res => {
            // console.log(res)
          },
          err => {
            console.log('HTTP Error', err)
          },
          () => {
            this.getConvenios()
          }
        )
      }
    })
  }
   cambiarPagina(valor: number, search: any) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }

     const params = {
    ...search,          // 🔑 filtros
    limit: this.limit,
    skip: this.skip,
  };
    console.log('params', params, 'search', search  );
    this.getConvenios(params);
  }
}
