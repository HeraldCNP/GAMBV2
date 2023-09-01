import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportAlmService } from '../../../services/report-alm.service';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-report-articulos',
  templateUrl: './report-articulos.component.html',
  styleUrls: ['./report-articulos.component.css']
})
export class ReportArticulosComponent implements OnInit {
  reportForm: any;
  users: any;
  user: any;

  articulos: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2023').toISOString();

  idUser: any;
  usuario: any;
  data: any;

  cargando: boolean = true;
  partidas: any;
  medidas: any;
  codPartida: any;

  idPartida: string = '';
  unidadDeMedida: string = '';
  codigo: string = '';
  nombre: string = '';
  cantidad: string = '';
  stock: any;
  del: string = '';
  al: string = '';
  destino: string = '';
  constructor(private fb: FormBuilder, private reportAlm: ReportAlmService) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    this.idUser = this.data.id;

    this.reportForm = this.fb.group({
      idPartida: [''],
      unidadDeMedida: [''],
      codigo: [''],
      nombre: [''],
      cantidad: [''],
      stock:[]
    });
  }

  ngOnInit(): void {
    this.cargarPartidas()
    this.cargarMedidas()
  }

  cargarPartidas() {
    this.cargando = true;
    this.reportAlm.getAllPartidas().subscribe((data: any) => {
      this.partidas = data[0].partidas;
      // console.log("partidas", data[0].partidas)
    });
  }


  cargarMedidas() {
    this.cargando = true;
    this.reportAlm.getAllMedidas().subscribe((data: any) => {
      this.medidas = data.serverResponse;
      console.log("Medidas", this.medidas)
    });
  }

  get form() {
    return this.reportForm.controls;
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
    this.codPartida = this.partidas.find((item: { _id: string; }) => item._id === value);
    // console.log(this.codPartida)
  };

  obtenerArticulos(form: any) {
    this.idPartida = form.value.idPartida;
    this.unidadDeMedida = form.value.unidadDeMedida;
    this.codigo = form.value.codigo;
    this.nombre = form.value.nombre;
    this.cantidad = form.value.cantidad;
    this.stock = form.value.stock;

    // this.codigo = form.value.codigo;
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.reportAlm.getAllArticulos(this.idPartida, this.unidadDeMedida, this.codigo, this.nombre, this.cantidad, this.stock)
      .subscribe((data) => {
        this.articulos = data.serverResponse;
        console.log(this.articulos);
      });
  }

  imprimir() {
    const doc = new jsPDF({ orientation: "portrait", format: 'letter' });

    autoTable(doc,
      {
        html: '#table',
        useCss: true,
        theme: 'grid',
        styles: { fontSize: 3, halign: 'center' },
        showHead: 'firstPage',
        showFoot: 'lastPage',
        margin: 8,
      })

    //doc.autoTable({ html: 'htmlData'});
    doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
  }



}
