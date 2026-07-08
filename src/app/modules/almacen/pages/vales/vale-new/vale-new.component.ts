import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';
import { ValeService } from '../../../services/vale.service';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';

@Component({
  selector: 'app-vale-new',
  templateUrl: './vale-new.component.html',
  styleUrls: ['./vale-new.component.css'],
})
export class ValeNewComponent {
  idUser: any;
  user: any;
  data: any;
  idAutorizacion: any;
  createForm: any;

  catProgras: any;
  compras: any;
  noHayStock: boolean = false;
  compraSingle: any;

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

  private _snackBar = inject(MatSnackBar);

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private router: Router,
    private valeService: ValeService,
    private autorizacionService: AutorizacionService,
    private desembolsoService: DesembolsoService
  ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.idAutorizacion = this.activeRouter.snapshot.paramMap.get('id');

    console.log(this.idAutorizacion);

    this.createForm = this.fb.group({
      // autorizacion: [this.idAutorizacion],
      cantidad: [0.0],
      precio: ['', Validators.required],
      catProgra: ['', [Validators.required]],
      encargadoControl: [this.idUser],
      motivo: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      // unidadSolicitante: ['', [Validators.required]],
      conductor: ['', [Validators.required]],
      vehiculo: [''],
      fecha: [this.fechaHoy.substr(0, 10), [Validators.required]],
      idProducto: [''],
      idGastoFondo: ['6866f68000031001e6de7c95'],
      idTipoDesembolso: ['6866ab0ba7f78500a418421e'],
      idFuente: [''],
      encargado: ['RENE VEDIA MAMANI'],
      idEncargado: ['6253bf6900ae6f0014f7bc23'],
    });
  }

  ngOnInit(): void {
    this.cargarCatProgras();
    this.cargarUnidadSolicitante();
    this.cargarConductor();
    this.cargarVehiculo();
    this.cargarGastosFondos();
    this.cargarDesembolsos();
    this.cargarFuentes();
  }

  cargarCatProgras() {
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
    });
  }

  get form() {
    return this.createForm.controls;
  }

  crearVale(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.valeService.createVale(form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
        this._snackBar.open(err.error.serverResponse, 'Cerrar', {
          duration: 3000,
        });
      },
      () => {
        this.router.navigate(['almacen/vale/index']);
        this.alertOk('success', 'Exito', 'Vale Creado Correctamente', '2000');
        this.createForm.submitted = true;
      }
    );
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.valeService
      .getCompraOfCombustible(
        this.createForm.value.idProducto,
        this.createForm.value.catProgra
      )
      .subscribe((data: any) => {
        if (data.serverResponse.length == 0) {
          this.noHayStock = true;
        } else {
          this.compras = data.serverResponse;
          this.noHayStock = false;
        }
      });
  };

  cancel() {
    this.router.navigate(['almacen/vale/index']);
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  doSelect2 = (id: any) => {
    this.compraSingle = this.compras.find((objeto: any) => objeto._id === id);
  };

  calcularStock() {
    if (this.compraSingle) {
      if (this.createForm.value.cantidad > this.compraSingle.stockCompra) {
        Swal.fire('Cantidad insuficiente');
        this.createForm.value.cantidad = 0;
      }
    }
  }

  cargarUnidadSolicitante() {
    this.autorizacionService
      .getAllUnidadSolicitante()
      .subscribe((data: any) => {
        this.unidades = data;
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

    cargarGastosFondos() {
    this.desembolsoService.getGastosFondos().subscribe((data: any) => {
      this.gastoFondos = data;
    });
  }
  cargarDesembolsos(params?:any) {
    params = params || {};
    params.deMonto = 1;
    params.isClosed = 'false';
    this.desembolsoService.queryDesembolso(params).subscribe((data: any) => {
      this.desembolsos = data;
    });
  }
   cargarFuentes() {
    this.desembolsoService.getFuentes().subscribe((data: any) => {
      console.log('fuentes', data);
      this.fuentes = data;     
    });
  }

}
