import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { ComprasService } from '../../../services/compras.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';

@Component({
  selector: 'app-reporte-gastos',
  templateUrl: './reporteGastos.component.html',
  styleUrl: './reporteGastos.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteGastosComponent {
  idUser: any;
  user: any;
  data: any;
  gastos: any = [];
  cargando: boolean = true;
  searchForm: any;
  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();
  fechaHoy = new Date().toISOString();
  catProgras: any;
  funcionarios: any;
  busquedaAvanzadaVisible: boolean = false;
  partidas: any = [];
  gastoFondos: any = [];
  fuentes: any = [];
  desembolsos: any = [];
  descargos: any = [];
  tipoFondos: any = [];
  idDescargo: any;
  encargado = 'RENE VEDIA MAMANI';

  URL = environment.api;
  constructor(
    private gastoService: DesembolsoService,
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
      numDescargo: [''],
      catProgra: [''],
      estado: [''],
      deFecha: [this.fechaIni.substr(0, 10)],
      alFecha: [this.fechaHoy.substr(0, 10)],
      solicitante: [''],
      partida: [''],
      encargado: [this.encargado],
    });
  }

  ngOnInit(): void {
    this.cargarGastos({encargado: this.encargado});
    this.cargarCatProgras();
    this.cargarGastosFondos();
    // this.cargarDesembolsos();
    this.cargarTipoFondos();
    this.cargarFuentes();
    this.cargarFuncionarios({ isActive: true });
    this.getPartidas();
  }

  cargarGastos(params?: any) {
    this.cargando = true;
    this.gastoService.queryGastos(params).subscribe((data: any) => {
      this.gastos = data;
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

  cargarCatProgras() {
    this.cargando = true;
    this.comprasService.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
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

  printGasto(params?: any) {
    this.gastoService.printGasto(params).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // abre el PDF en nueva pestaña
    });
  }
  printGastoRepuesManteni(params?: any) {
    this.gastoService.printGastoRepuesManteni(params).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // abre el PDF en nueva pestaña
    });
  }
  /* printGasto(id: any) {
    const url = this.gastoService.printDesembolsoGasto(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  } */
  print(id: any) {
    const url = this.gastoService.printDescargoGasto(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      /* this.pdfUrl = fileURL;
      console.log(this.pdfUrl); */
    });
  }
  printResumenGasto(params?: any) {
    this.gastoService.queryPrintgasto(params).subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank'); // abre el PDF en nueva pestaña
    });
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
  doSelect1 = (numDescargo: string, params?: any) => {
    console.log('id', numDescargo);

    // Si quieres obtener el objeto completo:
    const descargoSeleccionado = this.descargos.find(
      (d: any) => d.numDescargo === numDescargo
    );
    console.log('Objeto completo:', descargoSeleccionado);
    this.idDescargo = descargoSeleccionado._id;

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
}
