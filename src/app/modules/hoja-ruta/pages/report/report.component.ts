import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportForm: any;
  users: any= [];
  cargos: any= [];
  user: any;
  destino: string = '';
  estado: string = '';
  recibidox: string = '';
  del: string = '';
  al: string = '';
  seguimientos: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2026').toISOString();

  idUser: any;
  usuario: any;
  data: any;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    this.idUser = this.data.id;
    this.reportForm = this.fb.group({
      destino: [''],
      usuario:[''],
      estado: [''],
      deFecha: [this.fechaIni.substr(0, 10)],
      alFecha: [this.fechaHoy.substr(0, 10)],
    });
  }

  ngOnInit(): void {
    this.reportService.getAllUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    });

    this.reportService.getAllCargos().subscribe((data) => {
      // console.log(data);
      this.cargos = data;
    });



  }

  get form() {
    return this.reportForm.controls;
  }

  obtenerHojasRutas(form: any) {
    this.destino = form.value.destino;
    this.usuario = form.value.usuario;
    this.estado = form.value.estado;
    this.del = form.value.deFecha;
    this.al = form.value.alFecha ;
    this.getSeguimientos();
  }

  resetFormSearch() {
    this.reportForm.reset({
     destino: '',
      usuario:'',
      estado: '',
      deFecha: this.fechaIni.substr(0, 10),
      alFecha: this.fechaHoy.substr(0, 10),
    });
   
  }
  getSeguimientos(params?: any) {
    this.reportService
      .queryGastos(params)
      .subscribe((data) => {
        this.seguimientos = data.serverResponse;
        console.log(this.seguimientos);
      });
  }

  imprimir() {
    const doc = new jsPDF({ orientation: "landscape", format: 'letter' });

    autoTable(doc,
      {

        html: '#table',
        useCss: true,
        theme: 'grid',
        styles: { fontSize: 5, halign: 'center' },
        showHead: 'firstPage',
        showFoot: 'lastPage',
        margin: 8,
      })

    //doc.autoTable({ html: 'htmlData'});
    doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
  }

  public doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);

    // this.user = this.users.find((item: { post: string; }) => item.post === value);
    // console.log(this.user)
  };

  public doSelect2 = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);

    this.user = this.users.find((item: { ci: string; }) => item.ci === value);
    console.log('Usuario', this.user)
  };

}
