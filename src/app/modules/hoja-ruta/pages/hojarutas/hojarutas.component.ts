import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hojaruta } from '../../models/hojaruta';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ComunicacionesService } from '../../services/comunicaciones.service';
import { ComprasService } from 'src/app/modules/almacen/services/compras.service';
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
  today = new Date();
  /*variables de consulta*/
  nuit: string = "";
  origen: any = "";
  year:any=this.today.getFullYear()
  campo:any = this.year;
  dategt:any = this.year;
  datelt:any=this.dategt+1;
  referencia: string = "";

  public search: string = "";
  public search2: string = "";
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
  aso: any = [];
  lisaso: string = ' ';
  cargando: boolean = true;
  isUsuario: boolean = true;
  funcionarios: any;
  funcionario:any='';
  ori:any;

  asociarForm: any;
  hojaAsociar : any;

  pago: boolean = false;
  tipodoc:string = "";

  hrPrincipal:any;
  asociadosHr:any;
  last:any;
  constructor(private api: RutaService,
    private router: Router,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private comunicacionesService: ComunicacionesService,
    private comprasService: ComprasService) {

    this.hojaForm = this.fb.group({
      origen: ['', Validators.required],
      referencia: ['', Validators.required],
      fechadocumento: ['', Validators.required],
      tipoDoc: [''],
      contacto: [''],
      numCite: [''],
      beneficiarioPago:['']
    });

    this.asociarForm = new FormGroup({
      cargo: new FormControl('', Validators.required),
      nuit: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user);

    this.getHojaRutas();
    // this.getHojaRuta();
    this.cargarFuncionarios();
  }

  isUser(a:boolean){
    this.isUsuario = a;
    console.log(this.isUsuario);
    if (this.isUsuario === false){
      Swal.fire({
        title: 'ES PAGO?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.hojaForm.value.tipoDoc = 'pago';
          this.pago = true;
        }
        if(result.isDenied){
          this.pago = false;
        }
      })
    }
    if(this.isUsuario === true){
      this.pago = false;
    }
  }

  doSelect = (value: any) => {
    const elementoEncontrado = this.funcionarios.find((user: { _id: any; }) => user._id == value);
    this.funcionario = elementoEncontrado.username +' '+ elementoEncontrado.surnames;
    console.log('SingleDemoComponent.doSelect', this.funcionario);
  }

  cargarFuncionarios() {
    this.cargando = true;
    this.comprasService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      // console.log("Funcionarios", data)
    });
  }

  get form() {
    return this.hojaForm.controls;
  }


  registerHojas() {
    let finyear=this.year.toString().slice(-2)
    console.log(finyear)
    this.cant = this.cant + 1;
    //this.totalh = this.cant +"-" +finyear;
    if(this.funcionario!=''){
      this.ori = this.funcionario;
    }else{
      this.ori = this.hojaForm.get('origen')?.value;
    }


    console.log(this.pago);


    if(this.pago === true){
      var HOJA: Hojaruta = {
        origen: this.ori,
        tipodoc: "pago",
        beneficiarioPago: this.hojaForm.get('beneficiarioPago')?.value,
        contacto: this.hojaForm.get('contacto')?.value,
        referencia: this.hojaForm.get('referencia')?.value,
        fechadocumento: this.hojaForm.get('fechadocumento')?.value,
        numCite: this.hojaForm.get('numCite')?.value,
        //nuit: this.totalh,
      };
    }else{
      var HOJA: Hojaruta = {
        origen: this.ori,
        tipodoc: '',
        contacto: this.hojaForm.get('contacto')?.value,
        referencia: this.hojaForm.get('referencia')?.value,
        fechadocumento: this.hojaForm.get('fechadocumento')?.value,
        numCite: this.hojaForm.get('numCite')?.value,
        //nuit: this.totalh,
      };
    }

    // console.log('antes de enviar',HOJA);


    this.funcionario='';
    this.api.register(HOJA).subscribe(
      (data) => {
        // console.log(HOJA);

        this.page = 1;
        this.getHojaRutas()
        this.hojaForm.reset();
        this.isUsuario = true;
        this.pago = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // registerNewHojaRuta() {
  //   let fd = new FormData();
  //   fd.append('documento', this.addFileForm.value.documento);
  //   fd.append('file', this.files[0]);
  //   this.ejecucionService.addArchivo(fd, this.docEjecucionId).subscribe(
  //     (event) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round((100 * event.loaded) / event.total);
  //       }
  //     },
  //     (err) => {
  //       console.log('HTTP Error', err);
  //       this.progress = 0;
  //     },
  //     () => {
  //       this.progress = 0;
  //       this.getDocEjecucion();
  //       this.resetForm();
  //       this.alertOk(
  //         'success',
  //         'Exito',
  //         'Documento Creado Correctamente',
  //         '2000'
  //       );
  //     }
  //   );
  // }


  getHojaRutas() {

    this.cargando = true;
    this.campo=parseInt(this.campo)
    if(this.campo==this.year-1){
      this.dategt=this.campo;
      this.datelt=this.campo+1;
    }else if(this.campo==this.year){
      this.dategt=this.campo;
      this.datelt=this.campo+1;
    }else{
      this.dategt=this.campo;
      this.datelt=this.year+1;
    }
    // console.log(this.campo)
    this.api.getAllHojaRuta(this.nuit, this.origen, this.dategt, this.datelt, this.limit, this.skip).subscribe(
      data => {
        this.cant=data.nuitok
        this.hojaRutas = data.serverResponse;
        // console.log(this.hojaRutas);

        this.totalPages = data.totalpage;
        this.search=" ";
        this.cargando = false;
        this.hojaForm.reset();
      }
    )


    this.comunicacionesService.termino.subscribe(
      termino => {
        this.cargando = true;
        this.search2 = termino;
        console.log(this.search2)
        this.api.buscarHoja(this.search2).subscribe(
          data => {
            if(data.serverResponse){
              this.hojaRutas = data.serverResponse;
              // console.log("result", this.hojaRutas)
              this.totalPages=1;
              this.cargando = false;
            }else{
              this.hojaRutas = [];
            }
          },
          error => {
            console.log(error);
            this.hojaRutas = [];
          }
        )
      }
    );

  }

  closeModalCreate(){
    this.isUsuario = true;
    console.log(this.isUsuario);
  }

  getHojaRuta(){

    this.aRouter.params.subscribe (params => {
      var search = params['search'];
      this.search = search;
      // console.log(search)
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

  segui(idh: any){
    //this.loading = true;
    this.idhr=idh
    this.api.obtenerHoja(idh).subscribe(data => {
     // this.loading = false;
      this.hojaRuta = data.serverResponse;
      this.seguim=this.hojaRuta.seguimiento
    }, error => {
      console.log(error);
    })

  }
  /* seguimi(idh: any){
    //this.loading = true;
    this.idhr=idh
    this.api.obtenerHoja(idh).subscribe(data => {
     // this.loading = false;
      this.hojaRuta = data.serverResponse;
      this.api.buscarnuit(this.hojaRuta.nuit).subscribe(data => {
        this.seguim = data;
        console.log(this.seguim);

      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })

  }
 */
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

  changeTipoDoc(value: any) {
    if(this.pago == true){
      this.hojaForm.value.tipodoc = "";
      this.tipodoc="";
      this.pago = false;
      console.log('tipo1', this.pago, this.hojaForm.value.tipodoc, this.tipodoc);
    }else{
      this.hojaForm.value.tipodoc = "pago";
      this.tipodoc="pago";
      this.pago = true;
      console.log('tipo2', this.pago, this.hojaForm.value.tipodoc, this.tipodoc);
    }

  }

 /*  changeTipoDoc2(value: any) {
    //this.pago = false;
    // console.log('tipo', this.tipo);
  } */
  resetForm() {
    this.hojaForm.reset();
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


  ImprimirHR() {
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

  asociar(hoja:any){
    console.log(hoja);
    // console.log(this.data.post);
    this.asociarForm.patchValue({
      cargo: this.data.post,
    });

    this.hojaAsociar = hoja;

  }

  consultaAsociar(hoja:any){
    Swal.fire({
      title: 'ASOCIAR',
      text: `Estas seguro de asociar: ${this.asociarForm.value.nuit}  a la hoja de ruta: ${hoja}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('si');
        this.asociar2();
      }
      if(result.isDenied){
        // console.log('no');
        this.asociarForm.reset();
      }
    })
  }

  verAsociados(hr:any){


    this.api.getHr(hr._id).subscribe(
      (data) => {
        this.hrPrincipal = data;
        this.asociadosHr = data.asociados;
        this.last = this.hrPrincipal.seguimiento[this.hrPrincipal.seguimiento.length - 1];
        // console.log('principal', this.hrPrincipal);
        // console.log(this.hrPrincipal);

      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error.serverResponse,
        });
      }
    );
  }

  eliminarEnvio(hr:any){
    Swal.fire({
      title: 'Estas seguro de Eliminar?',
      text: `Se va eliminar el primer registro de Seguimiento`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.eliminarEnvio(hr._id).subscribe(
          (data) => {
            console.log(data);
            this.getHojaRutas();
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.error.serverResponse,
            });
          }
        );
      }
    })

  }

  asociar2(){

    this.api.asociar(this.hojaAsociar.nuit, this.asociarForm.value).subscribe(
      (data) => {
        console.log(data);
        this.asociarForm.reset();
        this.getHojaRutas();
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error.serverResponse,
        });
      }
    );
  }

  cleanAsociarForm(){
    this.asociarForm.reset();
  }

  calcularDias(fechaDerivado: any) {
    // Convertir las fechas a objetos Date
    const fechaInicio = new Date(fechaDerivado);
    const fechaActual = new Date();

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaActual.getTime() - fechaInicio.getTime();

    // Convertir la diferencia a días (1 día = 86400000 milisegundos)
    const diferenciaDias = Math.floor(diferenciaMilisegundos / 86400000);

    return `Hace ${diferenciaDias} días`;
    // console.log(`Han pasado ${diferenciaDias} días desde el ${fechaDerivado}`);
  }

  calcularDiferencia(fecha1: any, fecha2: any) {
    // Convertir las fechas a objetos Date
    const fecha1Obj = new Date(fecha1);
    const fecha2Obj = new Date(fecha2);

    // Asegurarnos de que fecha1 sea mayor que fecha2
    if (fecha2Obj > fecha1Obj) {
      console.error('La fecha 1 debe ser mayor que la fecha 2');
      return;
    }

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fecha1Obj.getTime() - fecha2Obj.getTime();

    // Calcular la diferencia en días, horas y minutos
    const milisegundosPorDia = 86400000;
    const milisegundosPorHora = 3600000;
    const milisegundosPorMinuto = 60000;

    const diferenciaDias = Math.floor(diferenciaMilisegundos / milisegundosPorDia);
    const diferenciaHorasRestantes = diferenciaMilisegundos % milisegundosPorDia;
    const diferenciaHoras = Math.floor(diferenciaHorasRestantes / milisegundosPorHora);
    const diferenciaMinutos = Math.floor((diferenciaHorasRestantes % milisegundosPorHora) / milisegundosPorMinuto);

    let resultado = "";
    if (diferenciaDias > 0) {
      resultado += `${diferenciaDias} día${diferenciaDias !== 1 ? 's' : ''}`;
    }
    if (diferenciaHoras > 0) {
      if (resultado !== "") {
        resultado += ", ";
      }
      resultado += `${diferenciaHoras} hora${diferenciaHoras !== 1 ? 's' : ''}`;
    }
    if (diferenciaMinutos > 0 || resultado === "") {
      if (resultado !== "") {
        resultado += ", ";
      }
      resultado += `${diferenciaMinutos} minuto${diferenciaMinutos !== 1 ? 's' : ''}`;
    }

    // console.log(resultado);
    

    return resultado;
  }



}
