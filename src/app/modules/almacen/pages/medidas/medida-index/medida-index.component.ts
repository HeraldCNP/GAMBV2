import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-medida-index',
  templateUrl: './medida-index.component.html',
  styleUrls: ['./medida-index.component.css'],
})
export class MedidaIndexComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  totalMedidas: number = 0;
  articulos: any = [];
  partidas: any = [];
  medidas: any = [];
  medidasTemp: [] = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  medidaForm: any;
  editForm: any;
  cargando: boolean = true;
  idMedida: any;

  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.medidaForm = this.fb.group({
      unidadMedida: ['', [Validators.required]],
      simbolo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarMedidas();
  }

  cargarMedidas() {
    this.cargando = true;
    this.almacenService
      .getAllMedidas(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalMedidas = data.totalDocs;
        this.medidas = data;
        this.medidasTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.medidas = this.medidasTemp;
      return;
    }
    this.almacenService.searchMedida(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.medidas = resp;
    });
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  };

  get form2() {
    return this.medidaForm.controls;
  }

  resetForm() {
    this.medidaForm.reset();
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
    this.cargarMedidas();
  }

  borrarMedida(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'La Medida ha sido eliminada.', 'success');
        this.almacenService.deleteMedida(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarMedidas()
        );
      }
    });
  }

  crearMedida(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.almacenService.createMedida(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.medidaForm.reset();
        this.cargarMedidas();
        this.alertOk('success', 'Exito', 'Medida Creada Correctamente', '2000');
      }
    );
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }
}
