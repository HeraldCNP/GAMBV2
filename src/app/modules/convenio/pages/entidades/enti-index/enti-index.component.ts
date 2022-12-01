import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvenioService } from '../../../services/convenio.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enti-index',
  templateUrl: './enti-index.component.html',
  styleUrls: ['./enti-index.component.css']
})
export class EntiIndexComponent implements OnInit {
  entidades: any[] = [];
  URL = environment.api;
  constructor(
    private api: ConvenioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEntidades();
  }

  getEntidades() {
    this.api.getAllEntidades().subscribe
      (res => {
        this.entidades = res;
        console.log(res)
      });
  }

  addEntidad() {
    this.router.navigate(['convenio/entidad/create'])
  }

  selectEntidad() {
    this.router.navigate(['convenio/entidad/select'])
  }

  addRepresentante(id: any) {
    this.router.navigate(['convenio/representante/create', id])
  }

  updateEntidad(id: any) {
    this.router.navigate(['convenio/entidad/update', id])
  }

  deleteEntidad(id: any) {
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
        this.api.deleteEntidad(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getEntidades()
        );
      }
    })
  }

}
