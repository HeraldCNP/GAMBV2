import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-enti-list',
  templateUrl: './enti-list.component.html',
  styleUrls: ['./enti-list.component.css']
})
export class EntiListComponent implements OnInit {
  entidades: any[] = [];
  URL = environment.api;
  searchForm: any;
  cargando: boolean = true;
  constructor(
    private api: ConvenioService,
    private router: Router,
     private fb: FormBuilder,
  ) { 
    this.searchForm = this.fb.group({
      codigo: [''],
      denominacion: [''],
      sigla: [''],
      tipoEntidad: [''],
      telefono: [''],
      nit: [''],
      estado: [],
      isActive: [],
    });
  }

  ngOnInit(): void {
    this.cargarEntidades();
  }

   cargarEntidades(params?: any) {
    this.cargando = true;
    console.log('params', params);
    
    this.api.queryEntidades(params).subscribe((data: any) => {
      console.log(data);
      this.entidades = data.entidades;
      this.cargando = false;
    });
  }

   resetFormSearch() {
    this.searchForm.reset({
      codigo: '',
      denominacion: '',
      sigla: '',
      tipoEntidad: '',
      telefono: '',
      nit: '',
      estado: '',
      isActive: '',
    });
    this.cargarEntidades();
  }

  printEntidades(params?: any) {
    this.api.printEntidades(params).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // abre el PDF en nueva pestaña
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
    this.router.navigate(['convenio/entidad/updated', id])
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
          () => this.cargarEntidades()
        );
      }
    })
  }

}
