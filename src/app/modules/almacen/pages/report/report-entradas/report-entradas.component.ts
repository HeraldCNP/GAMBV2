import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportAlmService } from '../../../services/report-alm.service';
import { AlmacenService } from '../../../services/almacen.service';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-report-entradas',
  templateUrl: './report-entradas.component.html',
  styleUrls: ['./report-entradas.component.css']
})
export class ReportEntradasComponent implements OnInit {
  reportForm: any;
  users: any;
  user: any;

  entradas: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2023').toISOString();

  idUser: any;
  usuario: any;
  data: any;

  cargando: boolean = true;
  catProgras: any;
  articles: any;
  nameCat: any;
  nameCate: any = [];

  catProgra: string = '';
  codigo: string = '';
  estadoCompra: string = '';
  estado: string = '';
  del: string = '';
  al: string = '';
  destino: string = '';


  separados: any;
  categories: any;
  categoryTotalPrices: any = 0;
  cantidades: any = [];

  constructor(private fb: FormBuilder, private reportAlm: ReportAlmService, private almacenService: AlmacenService) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    this.idUser = this.data.id;

    this.reportForm = this.fb.group({
      catProgra: [''],
      codigo: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
    });
  }

  ngOnInit(): void {
    // this.ReportAlmService.getAllUsers().subscribe((data) => {
    //   // console.log(this.users);
    //   this.users = data;
    // });
    this.cargarCatProgras();
    this.cargarArticles();
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

  obtenerEntradas(form: any) {
    this.catProgra = form.value.catProgra;
    this.codigo = form.value.codigo;
    this.estadoCompra = 'EXISTE';
    this.cargarEntradas();
  }

  cargarEntradas() {
    this.reportAlm
      .getAllEntradas(this.catProgra, this.codigo, this.estadoCompra, this.del, this.al)
      .subscribe(
        res => {
          this.entradas = res.serverResponse;
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

    this.categories.forEach((element: any) => {
      // console.log(this.separados[element]);

      // this.separados[element].sort((a:any, b:any) => {
      //   const codigoA = a.idArticulo.idPartida.codigo;
      //   const codigoB = b.idArticulo.idPartida.codigo;
      //   return codigoA.localeCompare(codigoB);
      // });

      // console.log("ordenados", this.separados[element]);
    });
    this.categoryTotalPrices = this.categories.reduce((accumulator: any, category: any) => {
      const items = itemsByCategory[category];
      const total = items.reduce((accumulator: any, item: any) => accumulator + (item.precio * item.cantidadCompra), 0);
      this.cantidades[category] = items.reduce((accumulator: any, item: any) => accumulator + item.cantidadCompra, 0);
      console.log('totalCanti', this.cantidades);

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
    }, {});
    // console.log("sumas", this.categoryTotalPrices)
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasAgrupadas", this.separados)
  }

}
