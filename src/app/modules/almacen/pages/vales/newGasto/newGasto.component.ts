import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValeService } from '../../../services/vale.service';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { ComprasService } from '../../../services/compras.service';
import Swal from 'sweetalert2';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';

@Component({
  selector: 'app-new-gasto',
  templateUrl: './newGasto.component.html',
  styleUrl: './newGasto.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGastoComponent {
  createForm: any;
  catProgras: any;
  unidades: any;
  vehiculos: any;
  conductores: any;
  fechaHoy = new Date().toISOString();

  articulos: any;
  articulosTemp: any;
  article: any;
  productos: any = [];

  gastoFondos: any = [];
  fuentes: any;
  desembolsos: any = [];
  proveedores: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private comprasService: ComprasService,
    private valeService: ValeService,
    private autorizacionService: AutorizacionService,
    private desembolsoService: DesembolsoService
  ) {
    this.createForm = this.fb.group({
      // autorizacion: [this.idAutorizacion],
      precio: ['', Validators.required],
      catProgra: ['', [Validators.required]],
      conductor: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]],
      fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
      idProducto: [''],
      idGastoFondo: ['', [Validators.required]],
      idDesembolso: ['', [Validators.required]],
      idDesemFuente: ['', [Validators.required]],
      descripcion: [''],
      idProveedor: [''],
    });
  }
  ngOnInit(): void {
    this.cargarCatProgras();
    //this.cargarUnidadSolicitante();
    this.cargarConductor();
    this.cargarProveedores();
    this.cargarVehiculo();
    this.cargarGastosFondos();
    this.cargarDesembolsos();
  }

  createGasto() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const form = this.createForm.value;
    this.desembolsoService.addGasto(form).subscribe(
      (data: any) => {
        this.alertOk(
          'success',
          'Gasto creado',
          'El gasto se ha creado correctamente',
          2000
        );
        this.router.navigate(['almacen/gastos']);
      },
      (error: any) => {
        console.log(error);
        if (error.status === 0) {
          setTimeout(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Conexión',
              text: 'No se puede conectar con el servidor. Por favor, inténtalo más tarde.',
            });
          }, 15);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ALTO!!!',
            text: error.error.serverResponse || 'Ocurrió un error inesperado.',
          });
        }
      }
    );
  }

  cargarCatProgras() {
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
    });
  }

  get form() {
    return this.createForm.controls;
  }
  cancel() {
    this.router.navigate(['almacen/gastos']);
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }
  cargarConductor() {
    this.autorizacionService.getAllConductores().subscribe((data: any) => {
      this.conductores = data.serverResponse;
    });
  }
  cargarVehiculo() {
    this.autorizacionService.getAllVehiculos().subscribe((data: any) => {
      this.vehiculos = data.serverResponse;
    });
  }
  cargarGastosFondos() {
    this.desembolsoService.getGastosFondos().subscribe((data: any) => {
      this.gastoFondos = data;
    });
  }
  cargarDesembolsos(params?: any) {
    params = params || {};
    params.deMonto = 1;
    params.isClosed = 'false';
    this.desembolsoService.queryDesembolso(params).subscribe((data: any) => {
      this.desembolsos = data;
    });
  }
   cargarProveedores() {
    this.comprasService.getAllProveedores().subscribe((data: any) => {
      this.proveedores = data.serverResponse;
      console.log("Proveedores", data)
    });
  }
  doSelect3 = (id: any) => {
    let desembolso = this.desembolsos.find((objeto: any) => objeto._id === id);
    let original = desembolso.idFuentes;
    this.fuentes = original.map((item: { [x: string]: any; idFuente: any }) => {
      const { ffof, denominacion } = item.idFuente;
      const { idFuente, ...resto } = item;

      return {
        ...resto,
        ffof,
        denominacion,
      };
    });
  };
}
