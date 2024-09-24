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
  limit: number = 0;
  totalPages: any;
  showModal: boolean = true;
  vehiculoForm: any;
  editForm: any;
  cargando: boolean = true;
  idVehiculo: any;
  constructor(private almacenService: AlmacenService, private fb: FormBuilder) {
    this.vehiculoForm = this.fb.group({
      marca: ['', [Validators.required]],
      color: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      propietario: ['', [Validators.required]],
      numMotor: [''],
      numChasis: [''],
      estado: [''],
      observacion: [''],
      codigoDejurbe: [''],
      codigoVsiaf: [''],
    });

    this.editForm = this.fb.group({
      marca: ['', [Validators.required]],
      color: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      propietario: ['', [Validators.required]],
      numMotor: [''],
      numChasis: [''],
      estado: [''],
      observacion: [''],
      codigoDejurbe: [''],
      codigoVsiaf: [''],
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
      marca: vehiculo.marca,
      color: vehiculo.color || null,
      placa: vehiculo.placa,
      tipo: vehiculo.tipo,
      destino: vehiculo.destino,
      propietario: vehiculo.propietario || null,
      estado: vehiculo.estado,
      numMotor: null,
      numChasis: null,
      observacion: null,
      codigoDejurbe: null,
      codigoVsiaf: null,
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


  resetForm() {
    this.vehiculoForm.reset();
  }

  crearVehiculo(form: any) {
    this.almacenService.createVehiculo(form).subscribe(
      (res) => {
        this.alertOk(
          'success',
          'Exito',
          'Vehiculo creado correctamente',
          '2000'
        );
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => this.cargarVehiculos()
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

  editVehiculo(form: any) {
    this.almacenService.editVehiculo(form, this.idVehiculo).subscribe(
      (res) => {
        this.alertOk(
          'success',
          'Exito',
          'Vehiculo editado correctamente',
          '2000'
        );
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => this.cargarVehiculos()
    );
  }
}
