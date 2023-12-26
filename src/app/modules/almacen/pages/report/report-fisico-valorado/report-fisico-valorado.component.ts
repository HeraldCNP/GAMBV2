import { Component } from '@angular/core';
import { ReportAlmService } from '../../../services/report-alm.service';
import { AlmacenService } from '../../../services/almacen.service';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-report-fisico-valorado',
  templateUrl: './report-fisico-valorado.component.html',
  styleUrls: ['./report-fisico-valorado.component.css']
})
export class ReportFisicoValoradoComponent {
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2023').toISOString();
  idUser: any;
  usuario: any;
  data: any;
  entradas: any[] = [];
  cargando: boolean = true;
  separados: any;
  categories: any;
  totalSaldosIniciales: any = [];
  cantidadSaldosIniciales: any[] = [];
  totalIngresos: any = 0;
  totalIngresos2: any = [];
  cantidadIngresos: any = [];
  totalEgresos: any = [];
  cantidadEgresos: any = [];
  totalSaldos: any = [];
  cantidadSaldos: any = [];
  nameCate: any = [];



  sumaTotalCantidadIngresos: any;
  sumaTotalIngresos: any;

  sumaTotalCantidadEgresos: any;
  sumaTotalEgresos: any;

  sumaTotalSaldosIniciales: any;
  sumaTotalCantidadSaldosIniciales: any;

  sumaTotalSaldos: any;
  sumaTotalCantidadSaldos: any;

  constructor(private reportAlm: ReportAlmService, private almacenService: AlmacenService) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    this.idUser = this.data.id;

  }

  ngOnInit(): void {
    this.cargarEntradas();
  }





  cargarEntradas() {
    this.reportAlm
      .getAllCompras()
      .subscribe(
        (data: any) => {
          this.entradas = data.serverResponse;
          console.log(this.entradas);

        },
        err => console.log('HTTP Error', err),
        () => {
          this.separar();
        }
      );
  }


  separar() {
    // console.log("tratando de ordenar",this.ingreso.productos);
    const itemsByCategory = this.entradas.reduce((accumulator: any, current: any) => {
      if (!accumulator[current.catProgra]) {
        accumulator[current.catProgra] = [];
      }
      accumulator[current.catProgra].push(current);
      // console.log("solo", current);
      return accumulator;
    }, {});
    this.separados = itemsByCategory;
    this.categories = Object.keys(itemsByCategory);

    // this.categories.forEach((element: any) => {
    //   console.log(this.separados[element]);

    //   this.separados[element].sort((a:any, b:any) => {
    //     const codigoA = a.idArticulo.idPartida.codigo;
    //     const codigoB = b.idArticulo.idPartida.codigo;
    //     return codigoA.localeCompare(codigoB);
    //   });

    //   console.log("ordenados", this.separados[element]);
    // });
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasAgrupadas", this.separados)

    this.totalIngresos = this.categories.reduce((accumulator: any, category: any) => {
      const items = itemsByCategory[category];
      const total = items.reduce((accumulator: any, item: any) => accumulator + (item.precio * item.cantidadCompra), 0);






      const filtro = items.filter((item: { idEntrada: { tipo: string; }; }) => item.idEntrada.tipo == 'REGULAR');

      this.cantidadIngresos[category] = filtro.reduce((accumulator: any, item: { cantidadCompra: any; }) => {
        return accumulator + item.cantidadCompra;
      }, 0);

      const filtro2 = items.filter((item: { idEntrada: { tipo: string; }; }) => item.idEntrada.tipo == 'REGULAR');

      this.totalIngresos2[category] = filtro2.reduce((accumulator: any, item: { cantidadCompra: any; precio: number; }) => {
        return accumulator + (item.cantidadCompra * item.precio);
      }, 0);



      // this.cantidadIngresos[category] = items.reduce((accumulator: any, item: any) => accumulator + item.cantidadCompra, 0);
      // this.totalIngresos2[category] = items.reduce((accumulator: any, item: any) => accumulator + (item.cantidadCompra * item.precio), 0);

      this.cantidadEgresos[category] = items.reduce((accumulator: any, item: any) => accumulator + (item.cantidadCompra - item.stockCompra), 0);
      this.totalEgresos[category] = items.reduce((accumulator: any, item: any) => accumulator + ((item.cantidadCompra - item.stockCompra) * item.precio), 0);


      this.cantidadSaldos[category] = items.reduce((accumulator: any, item: any) => accumulator + item.stockCompra, 0);
      this.totalSaldos[category] = items.reduce((accumulator: any, item: any) => accumulator + (item.stockCompra * item.precio), 0);


      const filtrado = items.filter((item: { idEntrada: { tipo: string; }; }) => item.idEntrada.tipo == 'SALDO_2022');
      // console.log(filtrado);


      this.cantidadSaldosIniciales[category] = filtrado.reduce((accumulator: any, item: { cantidadCompra: any; }) => {
        return accumulator + item.cantidadCompra;
      }, 0);

      const filtrado2 = items.filter((item: { idEntrada: { tipo: string; }; }) => item.idEntrada.tipo == 'SALDO_2022');


      this.totalSaldosIniciales[category] = filtrado2.reduce((accumulator: number, item: { cantidadCompra: number; precio: number; }) => {
        return accumulator + (item.cantidadCompra * item.precio)
      }, 0);



      // console.log('totalCanti', this.cantidades);


      this.almacenService.searchSegCategoria(category)
        .subscribe(
          res => {
            // console.log(this.nameCate[category] = res.serverResponse[0].proyect_acti);
            this.nameCate[category] = res.serverResponse[0].proyect_acti
            // console.log(this.nameCat)
          },
          err => console.log('HTTP Error', err),
          () => {
            // console.log(this.nameCate)
          }
        );
      accumulator[category] = total;

      // console.log(accumulator);

      return accumulator;
    }, {} );
    // console.log("sumas", this.categoryTotalPrices)
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasAgrupadas", this.separados)
    this.cargando = false;

  }



  fullEgresos():void {
    // console.log(this.cantidadEgresos);



    const valoresTotalCantidadIngresos = Object.values(this.cantidadIngresos);
    this.sumaTotalCantidadIngresos = valoresTotalCantidadIngresos.reduce((acumulador:any, valor:any) => acumulador + valor, 0);

    const valoresTotalIngresos = Object.values(this.totalIngresos2);
    this.sumaTotalIngresos = valoresTotalIngresos.reduce((acumulador:any, valor:any) => acumulador + valor, 0);



    const valoresTotalCantidadEgresos = Object.values(this.totalEgresos);
    this.sumaTotalCantidadEgresos = valoresTotalCantidadEgresos.reduce((acumulador:any, valor:any) => acumulador + valor, 0);

    const valoresTotalEgresos = Object.values(this.cantidadEgresos);
    this.sumaTotalEgresos = valoresTotalEgresos.reduce((acumulador:any, valor:any) => acumulador + valor, 0);


    const valoresTotalSaldosIniciales = Object.values(this.totalSaldosIniciales);
    this.sumaTotalSaldosIniciales = valoresTotalSaldosIniciales.reduce((acumulador:any, valor:any) => acumulador + valor, 0);

    const valoresTotalCantidadSaldosIniciales = Object.values(this.cantidadSaldosIniciales);
    this.sumaTotalCantidadSaldosIniciales = valoresTotalCantidadSaldosIniciales.reduce((acumulador:any, valor:any) => acumulador + valor, 0);


    const valoresTotalSaldos = Object.values(this.totalSaldos);
    this.sumaTotalSaldos = valoresTotalSaldos.reduce((acumulador:any, valor:any) => acumulador + valor, 0);

    const valoresTotalCantidadSaldos = Object.values(this.cantidadSaldos);
    this.sumaTotalCantidadSaldos = valoresTotalCantidadSaldos.reduce((acumulador:any, valor:any) => acumulador + valor, 0);


  }



}
