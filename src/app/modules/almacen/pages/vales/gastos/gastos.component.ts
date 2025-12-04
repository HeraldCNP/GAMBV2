import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { ComprasService } from '../../../services/compras.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';
import { ValeService } from '../../../services/vale.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastosComponent {
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
  descargoForm: any;
  funcionarios: any;
  gastoTemp: any = [];
  montoTotalGastos: any = 0;
  resumenFuente: any;
  busquedaAvanzadaVisible: boolean = false;
  partidas: any = [];
  idDescargo: any;
  encargado = 'RENE VEDIA MAMANI';
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
      encargado: 'RENE VEDIA MAMANI',
    });
    this.cargarGastos();
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
          (err) => console.log('HTTP Error', err),
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
            this.cargarGastos();
          },
          (err) => {
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
            this.cargarGastos();
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
    this.router.navigate(['/almacen/edit-gasto', id]);
  }
}
