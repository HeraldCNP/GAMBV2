import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';

@Component({
  selector: 'app-compra-index',
  templateUrl: './compra-index.component.html',
  styleUrls: ['./compra-index.component.css']
})
export class CompraIndexComponent implements OnInit {
  totalIngresos: any = 0;
  ingresos: any = [];
  programas: any = [];
  ingresosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  proveedorForm: any;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;
  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.cargando = true;
    this.comprasService
      .getAllIngresos(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalIngresos = data.totalDocs;
        this.ingresos = data;
        this.ingresosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.ingresos = this.ingresosTemp;
      return;
    }
    this.comprasService.searchIngreso(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.ingresos = resp;
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
    this.cargarIngresos();
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    this.comprasService.editIngreso(fd, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.cargarIngresos();
      }
    );
  }

  borrarIngreso(id: string) {
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
        Swal.fire('¡Eliminado!', 'El Proyecto ha sido eliminado.', 'success');
        this.comprasService.deleteIngreso(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarIngresos()
        );
      }
    });
  }

  addIngreso(){
    this.router.navigate(['almacen/compra/create']);
  }




}
