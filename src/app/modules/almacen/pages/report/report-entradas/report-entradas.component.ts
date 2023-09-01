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
