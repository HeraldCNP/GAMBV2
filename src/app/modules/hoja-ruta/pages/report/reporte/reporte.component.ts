import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  reportForm: any;
  users: any;
  user: any;
  destino: string = '';
  estado: string = '';
  del: string = '';
  al: string = '';
  seguimientos: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2023').toISOString();

  idUser: any;
  usuario: any;
  data: any;

  cargando: boolean = true;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    this.idUser = this.data.id;
    this.reportForm = this.fb.group({
      funcionario: [this.data._id],
      estado: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
    });
  }

  ngOnInit(): void {
    this.reportService.getAllUsers().subscribe((data) => {
      // console.log(this.users);
      this.users = data;
    });
    this.obtenerHojasRutas2();
  }

  get form() {
    return this.reportForm.controls;
  }

  obtenerHojasRutas(form: any) {
    console.log(form.value);
    this.destino = this.data.post;
    this.estado = form.value.estado;
    this.del = form.value.del;
    this.al = form.value.al;
    this.fechaHoy = this.al,
    this.fechaIni = this.del
    this.getSeguimientos();
  }

  obtenerHojasRutas2() {
    this.destino = this.data.post;
    this.estado = '';
    this.del = this.fechaIni;
    this.al = this.fechaHoy;
    this.getSeguimientos();
  }

  getSeguimientos() {
    // this.campo=parseInt(this.campo)
    // if(this.campo==this.year-1){
    //   this.dategt=this.campo;
    //   this.datelt=this.campo+1;
    // }else if(this.campo==this.year){
    //   this.dategt=this.campo;
    //   this.datelt=this.campo+1;
    // }else{
    //   this.dategt=this.campo;
    //   this.datelt=this.year+1;
    // }
    this.reportService
      .getAllSeguimientos(this.destino, this.estado, this.del, this.al)
      .subscribe((data) => {
        this.seguimientos = data.serverResponse;
        console.log(this.seguimientos);
        this.cargando = false;
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

    this.user = this.users.find((item: { post: string; }) => item.post === value);
    console.log(this.user)
  };
}
