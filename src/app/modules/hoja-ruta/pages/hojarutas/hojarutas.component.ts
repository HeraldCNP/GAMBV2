import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hojaruta } from '../../models/hojaruta';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-hojarutas',
  templateUrl: './hojarutas.component.html',
  styleUrls: ['./hojarutas.component.css']
})
export class HojarutasComponent implements OnInit {
  user: any;
  data: any;
  hojaRutas: any[] = [];
  hojaRuta: any = [];
  seguim: any = [];
  /*variables de consulta*/   
  nuit: string = "";
  origen: any = "";
  referencia: string = "";
  public search: string = "";
  limit: number = 10;
  skip: number = 1;
  page: number = 1;
  totalPages = 0;
  /*end variables de consulta*/
  /*variables de estados*/   
  estadoRecibido: string = "RECIBIDO";

  /*end variables de estados*/   
  /*variables de registro*/ 
  hojaForm: FormGroup;  
  titulo = 'GENERAR HOJA DE RUTA';
  cant: number = 0;
  totalh: string = '';
  /*end variables de registro*/
  idhr:string=""
  today = new Date();
  aso: any = [];
  lisaso: string = ' ';
  constructor(private api: RutaService,
    private router: Router,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute) {
    this.hojaForm = this.fb.group({
      origen: ['', Validators.required],
      referencia: ['', Validators.required],
      fechadocumento: ['', Validators.required],
      tipodoc: [''],
      contacto: [''],
    });
   }

  ngOnInit(): void {
    this.search=" "
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
    this.getHojaRutas()
    this.getHojaRuta()
  }

  registerHojas() {
    this.cant = this.cant + 1;
    this.totalh = this.cant + '-22';
    const HOJA: Hojaruta = {
      origen: this.hojaForm.get('origen')?.value,
      tipodoc: this.hojaForm.get('tipodoc')?.value,
      contacto: this.hojaForm.get('contacto')?.value,
      referencia: this.hojaForm.get('referencia')?.value,
      fechadocumento: this.hojaForm.get('fechadocumento')?.value,
      nuit: this.totalh,
    };
    this.api.register(HOJA).subscribe(
      (data) => {
        //this.router.navigate(['/hoja-ruta/listhr']);
        this.page = 1;
        this.getHojaRutas()
        this.hojaForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  getHojaRutas() {
    this.api.getAllHojaRuta(this.nuit, this.origen, this.limit, this.skip).subscribe(
      data => {
        this.cant=data.totalDocs
        this.hojaRutas = data.serverResponse;
        this.totalPages = data.totalpage;
        this.search=" ";
      }
    )
  }

  getHojaRuta(){
    /*this.api.buscarHoja(this.search).subscribe(
      data => {
        this.hojaRutas = data.serverResponse;
        this.search = '';
        this.totalPages=1;
      }
    )*/

    this.aRouter.params.subscribe (params => {
      var search = params['search'];
      this.search = search;
      console.log(search)
      if(search != undefined){
        this.api.buscarHoja(this.search).subscribe(
          data => {
            if(data.serverResponse){
              this.hojaRutas = data.serverResponse;
              this.totalPages=1;
            }else{
              this.hojaRutas = [];
              search=" ";
            }
          },
          error => {
            console.log(error);
            this.hojaRutas = [];
            search=" ";
          }
        )
      }
     
    });
  }


  paginaAnterior() {
    this.skip--;
    this.hojaRutas = [];
    this.getHojaRutas();
  }

  pageOne() {
    if (this.skip === 1) {
      return false;
    } else {
      return true;
    }
  }
  pageFinish() {
    if (this.skip === this.totalPages) {
      return false;
    } else {
      return true;
    }
  }

  paginaSiguiente() {
    this.skip++;
    this.hojaRutas = [];
    this.getHojaRutas();
  }

  cambiarestado(id: any){
    this.api.obtenerHoja(id).subscribe(data => {
      this.hojaRuta = data.serverResponse;
      let idh = this.hojaRuta._id;
      const HOJA: Hojaruta = {
        estado: this.estadoRecibido,
      }
      if (this.hojaRuta.estado === "REGISTRADO"){
        Swal.fire({
          title: 'Estás seguro Recibir?',
          text: "Esta seguro de recibir el trámite?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Recibir'
        }).then((result) => {
          if (result.isConfirmed) {
            this.api.EditarHoja(idh, HOJA).subscribe(data => {
            this.getHojaRutas()
            }, error => {
              console.log(error);
            })
          }
        })
      }
    }, error => {
      console.log(error);
    })
  }
  listAso(id: any) {
    this.api.obtenerHoja(id).subscribe(
      (data) => {
        let nuitAso = data.serverResponse.nuit;
        this.aso = data.serverResponse.asociado;

        for (let i = 0; i < this.aso.length; i++) {
          let asonuit = this.aso[i];
          this.lisaso = this.lisaso + asonuit.nuit + ' | ';
        }

        Swal.fire({
          title: 'ASOCIADO N°' + ' ' + this.lisaso,
          text: 'A N°' + ' ' + nuitAso,
          //text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Ir a Ver',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['', id]);
          }
        });
        this.lisaso = '';
      },
      (error) => {
        console.log(error);
      }
    );
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
  eliminarHoja(id: any) {
    //Alerta
    Swal.fire({
      title: '¿Estás seguro Eliminar?',
      text: 'Una vez borrado no podrás recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sì, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.eliminarHoja(id).subscribe(
          (data) => {
            this.getHojaRutas()
          },
          (error) => {
            console.log(error);
          }
        );
        Swal.fire(
          'Eliminado!',
          'El tramite se ha eliminado',
          'success'
        );
       // this.router.navigate(['/ruta/office/index']);
       
      }
    });
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
  ImprimirHRPDF() {
    const DATA: any = document.getElementById('htmlData1');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const imgp:any = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDFx
        const bufferX = 3;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(imgp);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          imgp,
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

  downloadHRPDF() {
    const DATA: any = document.getElementById('htmlData1');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const imgp = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 4;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(imgp);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          imgp,
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
