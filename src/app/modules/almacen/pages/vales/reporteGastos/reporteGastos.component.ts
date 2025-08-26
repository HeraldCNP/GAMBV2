import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { ComprasService } from '../../../services/compras.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

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

  gastoFondos: any = [];
  fuentes: any = [];
  desembolsos: any = [];
  tipoFondos: any = [];
  idDescargo: any;
 URL = environment.api;
  constructor(
    private gastoService: DesembolsoService,
    private comprasService: ComprasService,

    private router: Router,
    private fb: FormBuilder,
    private matDialog: MatDialog
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
    });
  }

  ngOnInit(): void {
    this.cargarGastos();
    this.cargarCatProgras();
    this.cargarGastosFondos();
    // this.cargarDesembolsos();
    this.cargarTipoFondos();
    this.cargarFuentes();
  }

  cargarGastos(params?: any) {
    this.cargando = true;
    this.gastoService.queryGastos(params).subscribe((data: any) => {
      this.gastos = data;
      this.cargando = false;
      console.log('gastos', data);
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
  doSelect = (id: any, params?: any) => {
    let desembolso = this.tipoFondos.find((objeto: any) => objeto._id === id);
    params = params || {};
    params.idTipoDesembolso = desembolso._id;
    this.gastoService.queryDescargos(params).subscribe((data: any) => {
      this.desembolsos = data;
      let original = data;
      console.log('original', original);
    });
  };
   doSelect1 = (id: any, params?: any) => {
    console.log('id', id);
    this.idDescargo = id;  
    console.log('idDescargo', this.idDescargo);
    
  };
   printGasto(id: any) {
    const url = this.gastoService.printDesembolsoGasto(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
     /*  this.pdfUrl = fileURL;
      console.log(this.pdfUrl); */
      
    });
  }
   print(id: any) {
    const url = this.gastoService.printDescargoGasto(id).subscribe((blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      /* this.pdfUrl = fileURL;
      console.log(this.pdfUrl); */
      
    });
  }
}
