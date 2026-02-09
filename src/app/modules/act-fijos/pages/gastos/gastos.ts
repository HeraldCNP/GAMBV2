import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ComprasService } from 'src/app/modules/almacen/services/compras.service';
import { ValeService } from 'src/app/modules/almacen/services/vale.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.html',
  styleUrl: './gastos.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gastos {
 idUser: any;
  user: any;
  data: any;
  gastos: any = [];
  cargando: boolean = true;
  searchForm: any;
  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();
  fechaHoy = new Date().toISOString();
  catProgras: any;

  gastoFondos: any = [];
  fuentes: any = [];
  descargos: any = [];
  desembolsos: any = [];
  tipoFondos: any = [];
  addFactForm: any;
  descargoForm: any;
  funcionarios: any;
  gastoTemp: any = [];
  montoTotalGastos: any = 0;
  resumenFuente: any;
  busquedaAvanzadaVisible: boolean = false;
  partidas: any = [];
  idDescargo: any;
  idGasto:any ='';
  encargado = 'FATIMA JHOSELYN LOPEZ GIL';
  constructor(
    private gastoService: DesembolsoService,
    private valeService: ValeService,
    private comprasService: ComprasService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private partida: ConvenioService
  ) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.searchForm = this.fb.group({
      tipoGasto: [''],
      tipoFondo: [''],
      fuente: [''],
      partida: [''],
      numDescargo: [''],
      catProgra: [''],
      estado: [''],
      deFecha: [this.fechaIni.substr(0, 10)],
      alFecha: [this.fechaHoy.substr(0, 10)],
      solicitante: [''],
      borrador: [true],
      encargado: [this.encargado],
    });
    this.descargoForm = this.fb.group({
      numero: ['', [Validators.required]],
      fechaDescargo: [this.fechaHoy.substr(0, 10), [Validators.required]],
      encargado: ['', [Validators.required]],
    });

    this.addFactForm = this.fb.group({
      numeroFactura: ['', [Validators.required]],
      fechaFactura: [this.fechaHoy.substr(0, 10), [Validators.required]],
      montoFactura: ['', [Validators.required]],
      idGasto: [this.idGasto],
    });
  }
  ngOnInit(): void {
    this.cargarGastos({encargado: this.encargado});
    this.cargarCatProgras();
    this.cargarGastosFondos();
    this.cargarDesembolsos();
    this.cargarTipoFondos();
    this.cargarFuentes();
    this.cargarFuncionarios({ isActive: true });
    this.getPartidas();
  }

  cargarGastos(params?: any) {
    this.cargando = true;
    this.gastoService.queryGastos(params).subscribe((data: any) => {
      this.gastos = data;
      console.log(this.gastos);
      
      this.gastoTemp = data;
      this.montoTotalGastos = data.montoTotalGasto;
      this.resumenFuente = data.resumenPorFuente;
      this.cargando = false;
    });
  }
  obtenerFechaInicial() {
    const date = new Date();
    const year = date.getFullYear();
    return `01/01/${year}`;
  }
  get form() {
    return this.searchForm.controls;
  }

   addFactura(form: any,) {
    console.log('form factura', form);
    this.valeService.addFacturaGasto(form).subscribe(
      (res: any) => {
        console.log(res);
        
        this.cargarGastos({encargado: this.encargado});
        this.resetForm();
        this.alertOk(
          'success',
          'Exito',
          'Desembolso Creado Correctamente',
          '2000'
        );
      },
     (error) => {      
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
    this.resetForm();
    this.cargarGastos({encargado: this.encargado});
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
      Swal.fire({
        icon,
        title,
        text,
        timer,
      });
    }
  cargarDataGasto(gasto: any) {
    console.log(gasto);
    
   this.addFactForm.patchValue({
     idGasto: gasto._id,
   });
   this.idGasto = gasto._id;
  }

  doSelect = (id: any, params?: any) => {
    let desembolso = this.tipoFondos.find(
      (objeto: any) => objeto.denominacion === id
    );
    params = params || {};
    params.idTipoDesembolso = desembolso._id;
    this.gastoService.queryDescargos(params).subscribe((data: any) => {
      this.descargos = data;
      let original = data;
      console.log('original', original);
    });
  };

  doSelect1 = (id: any, params?: any) => {
    console.log('id', id);
    this.idDescargo = id;
    console.log('idDescargo', this.idDescargo);
  };
 doSelect2 = (id: string, params?: any) => {
   
   // Si quieres obtener el objeto completo:
   const solicitanteSeleccionado = this.funcionarios.find(
     (d: any) => d._id === id
    );
    let solictante = solicitanteSeleccionado.username + ' ' + solicitanteSeleccionado.surnames;
    this.searchForm.value.solicitante = solictante;
    console.log(solicitanteSeleccionado._id);
    
  };
  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
    });
  }
  printGasto(params?: any) {
    this.gastoService.printGasto(params).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // abre el PDF en nueva pestaña
    });
  }
  get form2() {
    return this.descargoForm.controls;
  }
  resetForm() {
    this.descargoForm.reset();
    this.addFactForm.reset();
  }
  resetFormSearch() {
    this.searchForm.reset({
      tipoGasto: '',
      tipoFondo: '',
      fuente: '',
      partida: '',
      numDesembolso: '',
      catProgra: '',
      estado: '',
      deFecha: this.fechaIni.substr(0, 10),
      alFecha: this.fechaHoy.substr(0, 10),
      borrador: true,
      solicitante: '',
      encargado: 'FATIMA JHOSELYN LOPEZ GIL',
    });
    this.cargarGastos({encargado: this.encargado});
  }
  cargarFuncionarios(params?: any) {
    //params.isActive= true;
    this.authService.listUsers(params).subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
    });
  }

  busquedaAvanzada() {
    this.busquedaAvanzadaVisible = !this.busquedaAvanzadaVisible;
    console.log(this.busquedaAvanzadaVisible);
  }
  getPartidas() {
    this.partida.getAllPartidas().subscribe((data) => {
      this.partidas = data;
      // console.log("partidas", this.partidas)
      // console.log("partidas", data)
    });
  }

  changeStatus(id: any, estado: boolean, gasto: any) {
    let fd = new FormData();

    // si estado es true → EJECUTADO, si es false → EN ESPERA
    const nuevoEstado = estado ? 'EJECUTADO' : 'EN ESPERA';

    fd.append('estado', nuevoEstado);
    console.log('estado', nuevoEstado);
    gasto.estado = nuevoEstado;

    this.gastoService.changeEstado(id, fd).subscribe(
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
  }
  addDescargo(form: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, Registrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        let combustible = this.gastoTemp.gastos.filter(
          (item: any) =>
            item.idCombustible !== undefined && item.idCombustible !== null
        );
        let vales = combustible.map((item: any) => item.idCombustible._id);
        let gastos = this.gastoTemp.gastos.map((item: any) => item._id);

        form.montoDescargo = this.montoTotalGastos;
        form.idTipoDesembolso = '6866ab0ba7f78500a418421e';
        form.gastos = gastos;

        console.log('form', form);
        console.log('vales', vales);

        this.valeService.finalizarVales(vales).subscribe(
          (res: any) => {
            console.log(res);
          },
          (err: any) => console.log('HTTP Error', err),
          () => {}
        );

        this.gastoService.addDescargo(form).subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Descargo Registrado',
              text: 'El descargo se ha registrado correctamente.',
              timer: 2000,
              showConfirmButton: false,
            });
            this.resetForm();
            this.cargarGastos({encargado: this.encargado});
          },
          (err: any) => {
            console.error('Error al registrar el descargo:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo registrar el descargo. Inténtalo de nuevo.',
            });
          }
        );
      }
    });
  }
  ingresoSalida() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, Registrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        let combustible = this.gastoTemp.gastos.filter(
          (item: any) =>
            item.idCombustible !== undefined && item.idCombustible !== null
        );
        let vales = combustible.map((item: any) => item.idCombustible._id);
        console.log('vales', vales);

        this.valeService.finalizarVales(vales).subscribe(
          (res: any) => {
            console.log(res);
             Swal.fire({
              icon: 'success',
              title: 'Generado Ingreso y Salida',
              text: 'se ha registrado correctamente.',
              timer: 2000,
              showConfirmButton: false,
            });
            this.resetForm();
            this.cargarGastos({encargado: this.encargado});
          },
         (err) => {
            console.error('Error al registrar el descargo:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo registrar el ingreso salida. Inténtalo de nuevo.',
            });
          }
        );
      }
    });
  }
  cargarGastosFondos() {
    this.gastoService.getGastosFondos().subscribe((data: any) => {
      this.gastoFondos = data;
    });
  }
  cargarDesembolsos() {
    this.gastoService.getDesembolso().subscribe((data: any) => {
      this.desembolsos = data;
    });
  }
  cargarTipoFondos() {
    this.gastoService.getTipoFondos().subscribe((data: any) => {
      this.tipoFondos = data;
    });
  }
  cargarFuentes() {
    this.gastoService.getFuentes().subscribe((data: any) => {
      console.log('fuentes', data);
      this.fuentes = data;
    });
  }
   edit(id: any) {
    // Redireccionamos a la ruta de editar una autorización con el id pasado
    this.router.navigate(['/actFijos/gastoEdit', id]);
  }
}
