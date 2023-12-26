import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Report1 } from '../../models/report1';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  user: any;
  data: any;
  seguimientos: any = [];
  segTotal: any = [];
  totales: any = [];
  limit: number = 0;
  skip: number = 1;
  destino1: string = '';
  destino: any = ' ';
  estado: string = '';
  totalSeguimientos = 0;
  totalPages = 0;
  nuit: string = '';

  /* contadores */
  repor1:Report1[]=[];
  total: number = 0;
  totalRecibidos: number = 0;
  totalDerivados: number = 0;
  totalEnviados: number = 0;
  totalMaletin: number = 0;
  totalArchivado: number = 0;
  totalOfi: number = 0;
  estado2: string = '';
  cargo: string="";
  post: string="";
  usuario: string="";
  today = new Date();
  year:any=this.today.getFullYear()
  dategt:any = this.year;
  datelt:any=this.dategt+1;
  constructor(private api: RutaService, private apiUs: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    let RegExp = /[^()]*/g;
    this.destino1 = this.data.post;
    this.destino = RegExp.exec(this.destino1);
    this.getSeguimientos();
    this.obtenertotal()
    console.log(this.repor1)
  }

  getSeguimientos() {
    this.api
      .getAllSeguimientos(
        this.destino,
        this.estado,
        this.dategt,
        this.datelt,
        this.limit,
        this.skip,
        this.nuit
      )
      .subscribe((data) => {
        this.seguimientos = data.serverResponse;
        this.totalSeguimientos = data.totalDocs;
        this.totalPages = Math.ceil(this.totalSeguimientos / this.limit);
      });
  }

  obtenertotal() {
    // this.loading = true;
    // let RegExp = /[^()]*/g;
    // this.destino1 = this.data.post;
    // this.destino = RegExp.exec(this.destino1);
    this.apiUs.getAllUsers().subscribe((data)=>{
      this.segTotal=data
      data.forEach((user:any) => {

        this.cargo = user.post

        this.api.getTotalSeguimientos(this.cargo, this.estado2).subscribe(
          (data) => {
        this.post=user.post
        this.usuario=user.username + " "+ user.surnames
            // this.loading = false;
            this.totales = data.serverResponse;
            //console.log(this.totales)
           // console.log(this.totales.length)
            this.total = this.totales.length;
            this.totalRecibidos = this.totales.filter(
              (list: { estado: string }) => list.estado === 'RECIBIDO'
            ).length;
            this.totalDerivados = this.totales.filter(
              (list: { estado: string }) => list.estado === 'DERIVADO'
            ).length;
            this.totalEnviados = this.totales.filter(
              (list: { estado: string }) => list.estado === 'ENVIADO'
            ).length;
            this.totalMaletin = this.totales.filter(
              (list: { estado: string }) => list.estado === 'MALETIN'
            ).length;
            this.totalArchivado = this.totales.filter(
              (list: { estado: string }) => list.estado === 'ARCHIVADO'
            ).length;
            this.totalOfi = this.totales.filter(
              (list: { estado: string }) => list.estado === 'FILE OFICINA'
            ).length;

            const report1: Report1={
              user: this.usuario,
              cargo: this.post,
              total: this.total,
              totalrec: this.totalRecibidos,
              totalder: this.totalDerivados,
              totalsin: this.totalEnviados,
              totalmale: this.totalMaletin,
              totalofi: this.totalOfi
            }
            this.repor1.push(report1);
            /* this.repor1.sort((a, b) => {
              return b.total - a.total;
          }); */
          },
          (error) => {
            console.log(error);
          }

        );
      });
    })
  }
}
