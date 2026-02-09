import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ComprasService } from 'src/app/modules/almacen/services/compras.service';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { AutorizacionService } from '../../services/autorizacion.service';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-gasto',
  templateUrl: './addGasto.html',
  styleUrl: './addGasto.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGasto {

  idUser: any;
  user: any;
  data: any;
  articulos: any;
  article: any;
  articulosTemp: any;
  ordenId: any;
  listadeArticulos: any = [];
  proveedorForm: any;
  params: any = {};
  tipoFondos: any = [];
  dataOrden: any;
  fechaHoy = new Date().toISOString();

  catProgras: any;
  proveedores: any;
  funcionarios: any;
  vehiculos: any;
  conductores: any;
  fuentes: any = [];
  productos: any = [];
  servicios: any = [];
  cargando: boolean = true;

  createForm = this.fb.group({
    // autorizacion: [this.idAutorizacion],
    precio: ['', Validators.required],
    catProgra: ['', [Validators.required]],
    conductor: ['', [Validators.required]],
    unidadSolicitante: ['', [Validators.required]],
    vehiculo: ['', [Validators.required]],
    fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
    idGastoFondo: ['',],
    /*   idDesembolso: ['', [Validators.required]],
    idDesemFuente: ['', [Validators.required]], */
    idTipoDesembolso: ['6866ab0ba7f78500a418421e'],
    descripcion: [''],
    idFuente: [''],
    encargado: ['FATIMA JHOSELYN LOPEZ GIL'],
    idEncargado: ['6253bf3000ae6f0014f7bc1d'],
    proveedor: ['', Validators.required],
    idOrden: [''],


  });

  // fechaHoy:string = "2023/02/02";

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private comprasService: ComprasService,
    private valeService: ValeService,
    private autorizacionService: AutorizacionService,
    private desembolsoService: DesembolsoService,
    private gastoService: DesembolsoService,
    private authService: AuthService,
    private partida: ConvenioService,
  ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.ordenId = this.activeRouter.snapshot.paramMap.get('id');
    this.cargarCatProgras();
    this.cargarConductor();
    this.cargarVehiculo();
    this.cargarProveedores();
    this.cargarFuentes();
    this.autorizacionService.getOrden(this.ordenId).subscribe(data => {
      this.dataOrden = data;
      this.productos = this.dataOrden.productos;
      this.servicios = this.dataOrden.servicios;
      console.log("gasto", this.dataOrden);
      // console.log(this.dataCompra);
      // this.listadeArticulos = this.dataCompra.productos;

      this.createForm.patchValue({
        // cantidad: this.dataOrden.gestion,
        precio: this.dataOrden.precio,
        catProgra: this.dataOrden.catProgra,
        conductor: this.dataOrden.conductor._id ?? '',
        //unidadSolicitante: this.dataOrden.idSolicitante?._id ?? '',
        vehiculo: this.dataOrden.vehiculo?._id ?? '',
        fecha: this.dataOrden.fecha.substr(0, 10),
        //idTipoGasto: this.dataOrden.idTipoGasto?._id ?? '',
        // idFuente: this.dataOrden.idFuente?._id ?? '',
        //idPartida: this.dataOrden.idPartida?._id ?? '',
        descripcion: this.dataOrden.descripcion ?? '',
        // proveedor: this.dataOrden.proveedor?._id ?? ''
      });

    })
  }

  ngOnInit(): void {

  }

  createOrden() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const form = this.createForm.value;
    if (this.productos.length > 0) {
      form.idGastoFondo = "6866f80b00031001e6de7c99";
      form.idOrden = this.ordenId;
      form.precio = this.productos.reduce((total: number, producto: any) => total + (producto.precio * producto.cantidadCompra), 0);
      this.desembolsoService.addGasto(form).subscribe(
        (data: any) => {
          this.alertOk(
            'success',
            'Gasto creado',
            'El gasto se ha creado correctamente',
            2000
          );
          console.log(data);
          
           const dataOrden = {
            estado: "EJECUTADO",
            idGasto: [  ...this.dataOrden.idGasto, data.serverResponse._id]
          };
          this.autorizacionService.editOrden(this.ordenId, dataOrden).subscribe(
            (res: any) => {
              console.log(res);
              // opcional: actualizar el objeto en memoria
              // gasto.estado = nuevoEstado;
            },
            (err: any) => console.log('HTTP Error', err),
            () => {
              // this.getSegControl();
            }
          );
          this.router.navigate(['actFijos/gastos']);
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
    if (this.servicios.length > 0) {
      form.idGastoFondo = "6866f7fa00031001e6de7c97";
      form.idOrden = this.ordenId;
      form.precio = this.servicios.reduce((total: number, servicio: any) => total + (servicio.precioServ * servicio.cantidadServicio), 0);
      this.desembolsoService.addGasto(form).subscribe(
        (data: any) => {
          this.alertOk(
            'success',
            'Gasto creado',
            'El gasto se ha creado correctamente',
            2000
          );
          console.log(data);
          
          const dataOrden = {
            estado: "EJECUTADO",
            idGasto: [  ...this.dataOrden.idGasto, data.serverResponse._id]
          };
          this.autorizacionService.editOrden(this.ordenId, dataOrden).subscribe(
            (res: any) => {
              console.log(res);
              // opcional: actualizar el objeto en memoria
              // gasto.estado = nuevoEstado;
            },
            (err: any) => console.log('HTTP Error', err),
            () => {
              // this.getSegControl();
            }
          );
          this.router.navigate(['actFijos/gastos']);
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


  }
  get form() {
    return this.createForm.controls;
  }
  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }
  cancel() {
    this.router.navigate(['actFijos/gastos']);
  }
  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      console.log("Cat Progras", data.serverResponse)
    });
  }
  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }

  cargarConductor() {
    this.autorizacionService.getAllConductores().subscribe((data: any) => {
      this.conductores = data.serverResponse;
    });
  }

  cargarVehiculo() {
    this.autorizacionService.getAllVehiculos().subscribe((data: any) => {
      this.vehiculos = data.serverResponse;
      console.log(this.vehiculos);

    });
  }

  cargarProveedores() {
    this.comprasService.getAllProveedores().subscribe((data: any) => {
      this.proveedores = data.serverResponse;
      console.log("Proveedores", data)
    });
  }

  cargarFuentes() {
    this.desembolsoService.getFuentes().subscribe((data: any) => {
      console.log('fuentes', data);
      this.fuentes = data;
    });
  }
}
