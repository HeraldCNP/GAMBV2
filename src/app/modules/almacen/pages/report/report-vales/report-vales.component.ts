import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReportAlmService } from '../../../services/report-alm.service';
import { AlmacenService } from '../../../services/almacen.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { AutorizacionService } from 'src/app/modules/act-fijos/services/autorizacion.service';

@Component({
  selector: 'app-report-vales',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSelectModule, CommonModule, NgxPrintModule],
  templateUrl: './report-vales.component.html',
  styleUrl: './report-vales.component.css'
})
export class ReportValesComponent {
  reportForm: any;
  users: any;
  user: any;

  entradas: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date(this.obtenerFechaInicial()).toISOString();

  idUser: any;
  usuario: any;
  data: any;

  cargando: boolean = true;
  catProgras: any;
  articles: any;

  nameCat: any;
  nameCate: any = [];
  vales = signal<any>(null);

  catProgra: string = '';
  idProducto: string = '';
  estadoCompra: string = '';
  estado: string = '';
  del: string = '';
  al: string = '';
  destino: string = '';


  separados: any;
  categories: any;
  categoryTotalPrices: any = 0;

  cantidades: any = [];
  montosEntregados: any = [];
  montosPagados: any = [];
  saldos: any = [];
  saldosDevueltos: any = [];

  totalCantidades: any = [];
  totalMontosEntregados: any = [];
  totalMontosPagados: any = [];
  totalSaldos: any = [];
  totalSaldosDevueltos: any = [];

  vehiculos: any;
  conductores: any;


  constructor(private fb: FormBuilder, private reportAlm: ReportAlmService, private almacenService: AlmacenService, private autorizacionService: AutorizacionService,) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    console.log(this.data);

    this.idUser = this.data.id;

    this.reportForm = this.fb.group({
      conductor: [''],
      vehiculo: [''],
      catProgra: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
    });
  }

  obtenerFechaInicial() {
    const date = new Date();
    const year = date.getFullYear();
    return `01/01/${year}`;
  }

  ngOnInit(): void {
    // this.ReportAlmService.getAllUsers().subscribe((data) => {
    //   // console.log(this.users);
    //   this.users = data;
    // });
    this.cargarCatProgras();
    this.cargarVehiculos();
    this.cargarConductores();
  }

  cargarCatProgras() {
    this.cargando = true;
    this.reportAlm.getAllCatProgras().subscribe((data: any) => {
      this.catProgras = data.serverResponse;
      // console.log("Cat Progras", this.catProgras)
    });
  }


  cargarArticles() {
    this.cargando = true;
    this.reportAlm.getAllArticles().subscribe((data: any) => {
      this.articles = data.serverResponse;
      // console.log("articles", this.articles);
    });
  }

  get form() {
    return this.reportForm.controls;
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.nameCat = this.catProgras.find((item: { cat_programatica: string; }) => item.cat_programatica === value);
    // console.log(this.nameCat)
  };

  getVales(params?: any): void {
    // this.searchForm.get('ci').setValue(this.searchForm.get('ci').trim);
    this.reportAlm.getVales(params).subscribe({
      next: (data: any) => {
        this.vales.set(data.serverResponse);
        console.log(this.vales());
      },
      error: (error: any) => {
        console.log(error.error.message);
        // this._snackBar.open(error.error.message, 'Cerrar', { duration: 3000 });
      },
      complete: () => {
        this.separar();
      }
    });
  }

  cargarConductores() {
    this.autorizacionService.getAllConductores()
      .subscribe((data: any) => {
        this.conductores = data.serverResponse;
        console.log('conductores', this.conductores);
      });
  }

  cargarVehiculos() {
    this.autorizacionService.getAllVehiculos()
      .subscribe((data: any) => {
        this.vehiculos = data.serverResponse;
        console.log('vehiculos', this.vehiculos);
      });
  }



  calculateTotal() {
    this.totalCantidades = this.vales().reduce((acc: any, item: any) => acc + item.cantidad, 0);
    this.totalMontosEntregados = this.vales().reduce((acc: any, item: any) => acc + item.precio, 0);
    this.totalMontosPagados = this.vales().reduce((acc: any, item: any) => acc + item.cantidadAdquirida, 0);
    this.totalSaldos = this.vales().reduce((acc: any, item: any) => acc + (item.saldoDevolucion - item.saldoDevuelto), 0);
    this.totalSaldosDevueltos = this.vales().reduce((acc: any, item: any) => acc + item.saldoDevuelto, 0);

    // totalMontosEntregados: any = [];
    // totalMontosPagados: any = [];
    // totalSaldos: any = [];
    // totalSaldosDevueltos: any = [];
  }

  separar() {
    // console.log("tratando de ordenar",this.ingreso.productos);
    const itemsByCategory = this.vales().reduce((accumulator: any, current: any) => {
      if (!accumulator[current.catProgra]) {
        accumulator[current.catProgra] = [];
      }
      accumulator[current.catProgra].push(current);
      // console.log("solo", current);
      return accumulator;
    }, {});
    this.separados = itemsByCategory;
    console.log("separados", this.separados);


    this.categories = Object.keys(itemsByCategory);


    this.categoryTotalPrices = this.categories.reduce((accumulator: any, category: any) => {
      const items = itemsByCategory[category];
      const total = items.reduce((accumulator: any, item: any) => accumulator + (item.precio * item.stockCompra), 0);
      this.cantidades[category] = items.reduce((accumulator: any, item: any) => accumulator + item.cantidad, 0);
      this.montosEntregados[category] = items.reduce((accumulator: any, item: any) => accumulator + item.precio, 0);
      this.montosPagados[category] = items.reduce((accumulator: any, item: any) => accumulator + item.cantidadAdquirida, 0);
      this.saldos[category] = items.reduce((accumulator: any, item: any) => accumulator + (item.saldoDevolucion - item.saldoDevuelto), 0);
      this.saldosDevueltos[category] = items.reduce((accumulator: any, item: any) => accumulator + item.saldoDevuelto, 0);
      // console.log('totalCanti', total);

      this.almacenService.searchSegCategoria(category)
        .subscribe(
          res => {
            this.nameCate[category] = res.serverResponse[0].proyect_acti
          },
          err => console.log('HTTP Error', err),
          () => {

          }
        );
      accumulator[category] = total;


      // console.log(accumulator);

      return accumulator;
    }, {});
    this.calculateTotal();
    // this.categories.forEach((element: any) => {
    //   console.log(this.separados[element]);

    //   this.separados[element].sort((a:any, b:any) => {
    //     const codigoA = a.idArticulo.idPartida.codigo;
    //     const codigoB = b.idArticulo.idPartida.codigo;
    //     return codigoA.localeCompare(codigoB);
    //   });

    //   console.log("ordenados", this.separados[element]);
    // });


    // console.log("sumas", this.categoryTotalPrices)
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasAgrupadas", this.separados)
  }

}
