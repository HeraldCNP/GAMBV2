import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportAlmService } from '../../../services/report-alm.service';

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
  catProgras:any;
  articles:any;
  nameCat:any;

  catProgra: string = '';
  codigo: string = '';
  estado: string = '';
  del: string = '';
  al: string = '';
  destino: string = '';


//   if (params.catProgra != null) {
//     var catProgra = new RegExp(params.catProgra, "i");
//     filter1["catProgra"] = catProgra;
//   }
//   if (params.estadoCompra != null) {
//     var estadoCompra = new RegExp(params.estadoCompra, "i");
//     filter1["estadoCompra"] = estadoCompra;
//   }
//   if (params.cantidadCompra != null) {
//     var cantidadCompra = new RegExp(params.cantidadCompra, "i");
//     filter1["cantidadCompra"] = cantidadCompra;
//   }
//   if (params.stockCompra != null) {
//     var stockCompra = new RegExp(params.stockCompra, "i");
//     filter1["stockCompra"] = stockCompra;
//   }
//   if (params.codigo != null) {
//     var codigo = new RegExp(params.codigo, "i");
//     filter2["codigo"] = codigo;
//   }
//   if (params.nombre != null) {
//     var nombre = new RegExp(params.nombre, "i");
//     filter2["nombre"] = nombre;
//   }
//   if (params.unidadDeMedida != null) {
//     var unidadDeMedida = new RegExp(params.unidadDeMedida, "i");
//     filter2["unidadDeMedida"] = unidadDeMedida;
//   }
//   if (params.cantidad != null) {
//     var cantidad = new RegExp(params.cantidad, "i");
//     filter2["cantidad"] = cantidad;
//   }
//   if (params.estado != null) {
//     var expresion = new RegExp(params.estado);
//     filter2["estado"] = expresion;
//     }

  constructor(private fb: FormBuilder, private reportAlm: ReportAlmService) {
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
      console.log("Cat Progras", this.catProgras)
    });
  }


  cargarArticles() {
    this.cargando = true;
    this.reportAlm.getAllArticles().subscribe((data: any) => {
      this.articles = data.serverResponse;
      console.log("articles", this.articles);
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

  obtenerEntradas(form:any){
    this.catProgra = form.value.catProgra;
    this.codigo = form.value.codigo;
    this.cargarEntradas();
  }

  cargarEntradas(){
    this.reportAlm
    .getAllEntradas(this.catProgra, this.codigo, this.del, this.al)
    .subscribe((data) => {
      this.entradas = data.serverResponse;
      console.log(this.entradas);
    });
  }

  // obtenerHojasRutas(form: any) {
  //   console.log(form.value);
  //   this.destino = form.value.funcionario;
  //   this.estado = form.value.estado;
  //   this.del = form.value.del;
  //   this.al = form.value.al;
  //   this.fechaHoy = this.al,
  //   this.fechaIni = this.del
  //   this.getSeguimientos();
  // }

}
