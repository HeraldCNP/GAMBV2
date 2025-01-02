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
  users: any;
  cargos: any;
  user: any;
  destino: string = '';
  estado: string = '';
  recibidox: string = '';
  del: string = '';
  al: string = '';
  seguimientos: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2025').toISOString();

  idUser: any;
  usuario: any;
  data: any;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.usuario = localStorage.getItem('user');
    this.data = JSON.parse(this.usuario);
    this.idUser = this.data.id;
    this.reportForm = this.fb.group({
      funcionario: [''],
      recibidox:[''],
      estado: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
    });
  }

  ngOnInit(): void {
    this.reportService.getAllUsers().subscribe((data) => {
      // console.log(data);
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
    console.log(form.value);
    this.destino = form.value.recibidox;
    this.recibidox = this.user.username +' '+ this.user.surnames;
    this.estado = form.value.estado;
    this.del = form.value.del;
    this.al = form.value.al;
    this.fechaHoy = this.al,
    this.fechaIni = this.del
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
      .getAllSeguimientos(this.destino, this.recibidox, this.estado, this.del, this.al)
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

    this.user = this.users.find((item: { post: string; }) => item.post === value);
    console.log(this.user)
  };

  public doSelect2 = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);

    this.user = this.users.find((item: { _id: string; }) => item._id === value);
    console.log('Usuario', this.user)
  };

}
