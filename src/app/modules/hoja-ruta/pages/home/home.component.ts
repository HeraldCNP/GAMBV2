import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  data: any;
  hojaRutas: any = [];
  /*variables de consulta*/
  destino1: string = '';
  destino: any = '';
  totales: any = [];
  estado: string = '';
  limit: number = 0;
  skip: number = 1;
  totalSeguimientos = 0;
  totalPages = 0;
  nuit: string = '';
  origen: any = "";
  order: string = '';
  today = new Date();
  /*end variables de consulta*/
  /* contadores */
  total: number = 0;
  totalRecibidos: number = 0;
  totalDerivados: number = 0;
  totalEnviados: number = 0;
  totalMaletin: number = 0;
  totalArchivado: number = 0;
  totalOfi: number = 0;
  totalDocs: number = 0;
  canten:number = 0;
  cantre:number = 0;
  cantrec:number = 0;
  year:any=this.today.getFullYear()
  dategt:any = this.year;
  datelt:any=this.dategt+1;
  /*end contadores */
  constructor(private api: RutaService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.obtenertotal();
    this.getHojas();
  }
  obtenertotal() {
    // this.loading = true;
    let RegExp = /[^()]*/g;
    this.destino1 = this.data.post;
    this.destino = RegExp.exec(this.destino1);
    this.api.getTotalSeguimientos(this.destino, this.dategt, this.datelt).subscribe(
      (data) => {
        // this.loading = false;
        this.total = data.total;
        this.totalRecibidos=data.recibido;
        this.totalDerivados = data.derivado;
        this.totalEnviados =data.enviado;
        this.totalMaletin= data.maletin;
        this.totalOfi = data.fileOficina;
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getHojas() {
    this.api.getTotalHojaRuta(this.dategt, this.datelt).subscribe(data => {
     // this.hojaRutas = data.serverResponse;      
      this.totalDocs=data.total;
      this.cantre=data.registrado;
      this.canten = data.enviado;
      this.cantrec = data.recibido
      /* this.cantre = this.hojaRutas.filter((list: { estado: string; }) => list.estado === 'REGISTRADO').length;
      this.canten = this.hojaRutas.filter((list: { estado: string; }) => list.estado === 'ENVIADO').length;
      this.cantrec = this.hojaRutas.filter((list: { estado: string; }) => list.estado === 'RECIBIDO').length; */
    }, error => {
      console.log(error);
    })
  }
}
