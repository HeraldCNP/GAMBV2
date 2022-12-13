import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-gaceta-index',
  templateUrl: './gaceta-index.component.html',
  styleUrls: ['./gaceta-index.component.css']
})
export class GacetaIndexComponent implements OnInit {
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  @ViewChild('content',{static:false}) el!: ElementRef
  constructor(
    private router: Router,
    private api: BlogService
  ) { }

  gacetas: any = [];
  gaceta:any;
  ngOnInit(): void {
    this.getGacetas();
  }

  getGacetas(){
    this.api.getAllGacetas().subscribe
    (res => {
      this.gacetas = res;
      console.log(this.gacetas)
    });
  }

  changeStatus(id:any, estado:any){
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstado(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getGacetas();
        }
      );
  }

  getGaceta(id:any){
    this.api.getGaceta(id)
      .subscribe(
        res => {
          this.gaceta = res.serverResponse;
          console.log(this.gaceta)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.showModal = true;
        }
      );
  }

  generatePDF(){
    // let pdf = new jsPDF( 'p', 'mm', [215, 280]);
 
    // pdf.html(this.el.nativeElement,{
    //   callback:(pdf) => {
    //     pdf.save("output.pdf")
    //   }
    // })
    const DATA: any = document.getElementById('content'); 
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

  crearConvenio(form: any) {
    
  }

  

  registerGaceta(){

  }

  addGaceta(){
    this.router.navigate(['blog/gaceta/create'])
  }

  updateGaceta(id:string){
    this.router.navigate(['blog/gaceta/update', id])
  }

  deleteGaceta(id:string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El Documento ha sido eliminado.',
          'success'
        )
        this.api.deleteGaceta(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getGacetas()
        );
      }
    })
  }
}
