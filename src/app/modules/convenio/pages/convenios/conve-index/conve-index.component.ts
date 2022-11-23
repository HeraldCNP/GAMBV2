import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-index',
  templateUrl: './conve-index.component.html',
  styleUrls: ['./conve-index.component.css']
})
export class ConveIndexComponent implements OnInit {
  convenios: any = [];
  URL = environment.api;
  search: any;

  destino: any = '';
  estado: string = '';
  nombre: string = '';
  limit: number = 10;
  skip: number = 1;
  finFecha:any;
  constructor(
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getConvenios()
  }

  addConvenio() {
    this.router.navigate(['convenio/convenio/create'])
  }


  getConvenios() {
    this.api.getAllConvenios().subscribe(
      res => {
        this.convenios = res;
        console.log(res)
      }
    );
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

  }


  sumarDias(fecha: any, dias: any) {
    let fechaFin = new Date(fecha)
    fechaFin.setDate(fechaFin.getDate() + dias);
    // console.log(fechaFin.toISOString());
    return fechaFin.toISOString();
  }

  calcDias(fechaFin: any){
    let hoy = new Date().getTime();
    let fin = new Date(fechaFin).getTime();
    let diff = fin - hoy;
    let restante = Math.ceil(diff / (1000 * 3600 * 24));
    return restante;
  }

  // getSeguimientos() {
  //   this.api
  //     .getAllSeguimientos(
  //       this.destino,
  //       this.estado,
  //       this.limit,
  //       this.skip,
  //       this.nuit
  //     )
  //     .subscribe((data) => {
  //       this.seguimientos = data.serverResponse;
  //       this.nuit = '';
  //       this.totalSeguimientos = data.totalDocs;
  //       this.totalPages = Math.ceil(this.totalSeguimientos / this.limit);
  //     });
  // }


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
      this.finFecha = this.sumarDias(data.firma, data.plazo)
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
        fd.append('estado', "VIGENTE");
        fd.append('fechafin', this.finFecha);
        console.log(fd.get('fechafin'))
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
}
