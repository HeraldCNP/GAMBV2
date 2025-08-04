import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { ComprasService } from '../../../services/compras.service';

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
  desembolsos: any = [];
  tipoFondos: any = [];
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
      numDesembolso: [''],
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
    this.cargarDesembolsos();
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

}
