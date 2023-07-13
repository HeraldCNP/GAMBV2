import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-ingreso',
  templateUrl: './report-ingreso.component.html',
  styleUrls: ['./report-ingreso.component.css']
})
export class ReportIngresoComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  idUser: any;
  user: any;
  data: any;
  totalCompras: any = 0;
  compras: any = [];
  programas: any = [];
  comprasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  salidaForm: any;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;
  URL = environment.api;
  ingreso: any;
  x: any;
  date = new Date();
  separados: any;
  categories: any;
  funcionarios: any;
  categoryTotalPrices: any = 0;
  nameCat: any = [];

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.cargando = true;
    this.reportService
      .getAllCompras()
      .subscribe((data: any) => {
        this.totalCompras = data.totalDocs;
        this.compras = data;
        this.comprasTemp = data;
        this.totalPages = data.totalpage;
        console.log(this.compras);
        this.cargando = false;
      });
  }


  calculateTotalCost() {
    return this.compras.serverResponse.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }

}
