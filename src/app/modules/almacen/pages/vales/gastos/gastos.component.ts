import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';
import { ComprasService } from '../../../services/compras.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';

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
  constructor(
    private gastoService: DesembolsoService,
    private comprasService: ComprasService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private partida: ConvenioService,
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
      encargado: [''],
    });
    this.descargoForm = this.fb.group({
      numero: ['', [Validators.required]],
      fechaDescargo: [this.fechaHoy.substr(0, 10), [Validators.required]],
      encargado: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.cargarGastos();
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

  doSelect = (id: any, params?: any) => {
    let desembolso = this.tipoFondos.find((objeto: any) => objeto.denominacion === id);
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
    })
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
    this.partida.getAllPartidas().subscribe(data => {
      this.partidas = data;
      // console.log("partidas", this.partidas)
      // console.log("partidas", data)
    })
  }
  addDescargo(form: any) {
    let combustible = this.gastoTemp.gastos.filter(
      (item: any) =>
        item.idCombustible !== undefined && item.idCombustible !== null
    );
    let vales = combustible.map((item: any) => item.idCombustible);
    let gastos = this.gastoTemp.gastos.map((item: any) => item._id);
    form.montoDescargo = this.montoTotalGastos;
    // form.vales = vales;
    form.idTipoDesembolso = '6866ab0ba7f78500a418421e';
    form.gastos = gastos;
    //form.resumenFuente = this.resumenFuente
    console.log('form', form);
    this.gastoService.addDescargo(form).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Descargo Registrado',
          text: 'El descargo se ha registrado correctamente.',
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
