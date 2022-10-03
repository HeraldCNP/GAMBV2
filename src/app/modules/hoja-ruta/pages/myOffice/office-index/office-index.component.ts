import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../../services/ruta.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-office-index',
  templateUrl: './office-index.component.html',
  styleUrls: ['./office-index.component.css']
})
export class OfficeIndexComponent implements OnInit {
  user: any;
  data: any;
  seguimientos: any = [];
  totales: any = [];
  status: string = "RECIBIDO"
  hojaRuta: any = [];
  seguim: any = [];
  /*variables de consulta*/   
  destino1: string = "";
  destino: any = "";
  estado: string = "";
  limit: number = 0;
  skip: number = 0;
  /*end variables de consulta*/

  /* contadores */
  total:number = 0; 
  totalRecibidos:number = 0;
  totalDerivados:number = 0;
  totalEnviados:number = 0;
  totalMaletin:number = 0;
  totalArchivado:number = 0;
  /*end contadores */
  idhr:string=""
  constructor(private api: RutaService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    let RegExp = /[^()]*/g;
    this.destino1 = this.data.post;
    this.destino = RegExp.exec(this.destino1);
    this.getSeguimientos()
    this.obtenertotal()
  }

  seguimi(idh: any){
    //this.loading = true;
    this.idhr=idh
    this.api.obtenerHoja(idh).subscribe(data => {
     // this.loading = false;
      this.hojaRuta = data.serverResponse;
      this.api.buscarnuit(this.hojaRuta.nuit).subscribe(data => {
        this.seguim = data;
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })
    
  }



  getSeguimientos() {
    this.api.getAllSeguimientos(this.destino, this.estado, this.limit, this.skip).subscribe(
      data => {
        this.seguimientos = data;
        console.log(this.seguimientos)
      }
    )
  }

  changeStatus(status:any){
    this.estado = status;
    this.getSeguimientos();
    this.estado = "";
  }

  obtenertotal() {
    // this.loading = true;
    let RegExp = /[^()]*/g;
    this.destino1 = this.data.post;
    this.destino = RegExp.exec(this.destino1);
    this.api.getAllSeguimientos(this.destino, this.estado, this.limit, this.skip).subscribe(data => {
      // this.loading = false;
      this.totales = data;
      this.total = this.totales.length;
      this.totalRecibidos = this.totales.filter((list: { estado: string; }) => list.estado === 'RECIBIDO').length;
      this.totalDerivados = this.totales.filter((list: { estado: string; }) => list.estado === 'DERIVADO').length;
      this.totalEnviados = this.totales.filter((list: { estado: string; }) => list.estado === 'ENVIADO').length;
      this.totalMaletin = this.totales.filter((list: { estado: string; }) => list.estado === 'MALETIN').length;
      this.totalArchivado = this.totales.filter((list: { estado: string; }) => list.estado === 'ARCHIVADO').length;

      // if(this.totalEnviados>0){
      //   for(let i=0 ; i < this.totales.length ; i ++){
      //     this.ale=this.totales[i]
      //     if(this.ale.estado==="ENVIADO" && (this.hoy.diff(this.ale.fechaderivado, 'd') > 1)){
      //       this.alerta=true;
      //     }
      //   }
      // }
      // console.log("data>>", this.totales)
      // console.log("totales>>", this.total)
      // console.log("totalRecibidos>>", this.totalRecibidos)
      // console.log("totalDerivados>>", this.totalDerivados)
    }, error => {
      console.log(error);
    })
  }

  finalizar(id: any) {

  }

  reply(id: any) {
    
  }

  ImprimirPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 3;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
        //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
      });
  }

  ///Descargar

  downloadPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 4;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        //docResult.output('dataurlnewwindow', {filename: 'comprobante.pdf'});
        docResult.save(`${new Date().toISOString()}_GAMB_HojaDeRuta.pdf`);
      });
  }
  
}