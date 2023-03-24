import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-vehiculo-index',
  templateUrl: './vehiculo-index.component.html',
  styleUrls: ['./vehiculo-index.component.css']
})
export class VehiculoIndexComponent implements OnInit {
  totalVehiculos: any = 0;
  vehiculos: any = [];
  programas: any = [];
  vehiculosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  vehiculoForm: any;
  editForm: any;
  cargando: boolean = true;
  idVehiculo: any;
  constructor(private almacenService: AlmacenService, private fb: FormBuilder) {
    this.vehiculoForm = this.fb.group({
      representante: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: [''],
      ciudad: [''],
      usuario: [''],
    });

    this.editForm = this.fb.group({
      representante: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: [''],
      ciudad: [''],
    });
  }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.cargando = true;
    this.almacenService
      .getAllVehiculos(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalVehiculos = data.totalDocs;
        this.vehiculos = data;
        this.vehiculosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.vehiculos = this.vehiculosTemp;
      return;
    }
    this.almacenService.searchProveedor(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.vehiculos = resp;
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
    this.cargarVehiculos();
  }

  cargarDataEdit(vehiculo: any) {
    // console.log("idProve", vehiculo.representante)
    this.editForm.setValue({
      representante: vehiculo.representante,
      razon_social: vehiculo.razon_social,
      nit: vehiculo.nit,
      telefono: vehiculo.telefono,
      direccion: vehiculo.direccion,
      ciudad: vehiculo.ciudad,
    });
    this.idVehiculo = vehiculo._id;
  }

  borrarVehiculo(id: string) {
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
        Swal.fire('¡Eliminado!', 'El Vehiculo ha sido eliminado.', 'success');
        this.almacenService.deleteProveedor(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarVehiculos()
        );
      }
    });
  }

}
