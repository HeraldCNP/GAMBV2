import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConvenioService } from 'src/app/modules/convenio/services/convenio.service';
import { DesembolsoService } from 'src/app/modules/desembolso/services/desembolso.service';

@Component({
  selector: 'app-descargo',

  templateUrl: './descargo.html',
  styleUrl: './descargo.css',

})
export class Descargo {
  searchForm: any;
  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();
  fechaHoy = new Date().toISOString();

  user: any;
  data: any;
  funcionarios: any;
  descargos: any = [];
  tipoFondos: any = [];
  idDescargo: any;
  encargado: any = '';
  idEncargado: any = '';
  idUser = this.idEncargado;
  busquedaAvanzadaVisible: boolean = false;
  constructor(
    private gastoService: DesembolsoService,
    //private comprasService: ComprasService,
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
      idTipoDesembolso: [''],
      estado: [''],
      deFecha: [this.fechaIni.substr(0, 10)],
      alFecha: [this.fechaHoy.substr(0, 10)],
      encargado: [this.idUser],
    });
  }
  
  ngOnInit(): void {
    this.encargado = this.data.username + ' ' + this.data.surnames;
    this.idEncargado = this.data._id;
    
    this.cargarDescargos({encargado: this.idUser});
    this.cargarTipoFondos();
    this.cargarFuncionarios();
  }

  obtenerFechaInicial() {
    const date = new Date();
    const year = date.getFullYear();
    return `01/01/${year}`;
  }

  cargarDescargos(params?: any) {
    // Lógica para cargar los descargos desde el servicio
    this.gastoService.queryDescargos(params).subscribe((response: any) => {
      this.descargos = response;
      console.log('descargo', this.descargos);

    });
  }

  cargarTipoFondos() {
    this.gastoService.getTipoFondos().subscribe((data: any) => {
      this.tipoFondos = data;
    });
  }
  busquedaAvanzada() {
    this.busquedaAvanzadaVisible = !this.busquedaAvanzadaVisible;
    console.log(this.busquedaAvanzadaVisible);
  }

  resetFormSearch() {
    this.searchForm.reset({
      idTipoDesembolso: '',
      estado: '',
      deFecha: this.fechaIni.substr(0, 10),
      alFecha: this.fechaHoy.substr(0, 10),
      encargado: this.idEncargado,
    });
    this.cargarDescargos({encargado: this.idUser});
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

   cargarFuncionarios(params?: any) {
    //params.isActive= true;
    this.authService.listUsers(params).subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
    });
  }
}
