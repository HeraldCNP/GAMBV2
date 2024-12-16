import { Component, Injectable, OnInit } from '@angular/core';
import { RutaService } from '../../../services/ruta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Segui } from '../../../models/seguimiento';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-office-index',
  templateUrl: './office-index.component.html',
  styleUrls: ['./office-index.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class OfficeIndexComponent implements OnInit {
  user: any;
  data: any;
  seguimientos: any = [];
  totales: any = [];
  status: string = 'RECIBIDO';
  hojaRuta: any = [];
  seguim: any = [];
  segui: any = [];
  /*variables de consulta*/
  destino1: string = '';
  destino: any = '';
  estado: string = 'RECIBIDO';
  estado2: string = '';
  limit: number = 10;
  skip: number = 1;
  totalSeguimientos = 0;
  totalPages = 0;
  nuit: string = '';
  order: string = '';
  hoursDifference: number = 0;
  /*end variables de consulta*/

  /* contadores */
  total: number = 0;
  totalRecibidos: number = 0;
  totalDerivados: number = 0;
  totalEnviados: number = 0;
  totalMaletin: number = 0;
  totalArchivado: number = 0;
  totalOfi: number = 0;
  /*end contadores */
  idhr: string = '';
  today = new Date();
  aso: any = [];
  lisaso: string = ' ';
  sms: string = '';
  estadofin: string = 'MALETIN';
  vacio: any = '';
  seguireply: any = [];
  nuitreply: string = '';
  nuitre: any = [];
  res: any = {};
  idreply: number = 0;
  ale: any = {};
  alerta: boolean = false;
  hoy = new Date();
  nombreus: string = '';
  totales1: Segui[] = [];
  search: string = '';
  hojaRutas: any = [];
  year: any = this.today.getFullYear()
  dategt: any = this.year;
  datelt: any = this.dategt + 1;
  campo: any = this.year;

  hrPrincipal: any;
  asociadosHr: any;
  last: any;

  asociarForm: any;
  hojaAsociar: any;
  constructor(private api: RutaService, private router: Router) {
    this.asociarForm = new FormGroup({
      cargo: new FormControl('', Validators.required),
      nuit: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    // let RegExp = /[^()]*/g;
    this.destino = this.data.post;
    // this.destino = RegExp.exec(this.destino1);
    this.getSeguimientos();
    this.getpendientes();
    this.obtenertotal();
  }

  onclick(id: any) {
    this.onclick
    console.log("se hizo un click")
    console.log(id)
  }

  calculateHourDifference(dateString1: string, dateString2: any): number {
    // Convertir las fechas a objetos Date
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // console.log('fecha derivado', date1);
    // console.log('hoy', date2);

    // Calcular la diferencia en milisegundos
    const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

    // Convertir la diferencia de milisegundos a horas
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    return diffInHours;
  }


  checkIfDayChanged(dateString: string): boolean {
    // Convertir la cadena de fecha proporcionada a un objeto Date
    console.log(dateString);
    
    const providedDate = new Date(dateString);
      //console.log('fecha derivado',providedDate);
      

    // Obtener la fecha actual
    const currentDate = new Date();
    const currentDateOf = currentDate.getDate();
    
    //console.log('fecha actual',currentDate);
    
    
    
    // Comparar los días, meses y años de ambas fechas
    const providedDay = providedDate.getDate();
   // console.log('fecha hoy', providedDay);
    const providedMonth = providedDate.getUTCMonth();
    const providedYear = providedDate.getUTCFullYear();
  
    const currentDay = currentDate.getDate();
   // console.log('otra fecha', currentDay, currentDate);
    
    const currentMonth = currentDate.getUTCMonth();
    const currentYear = currentDate.getUTCFullYear();
  
    // Si alguna de las partes de la fecha es diferente, el día ha cambiado
    return providedDay !== currentDateOf || providedMonth !== currentMonth || providedYear !== currentYear;
  }

  getpendientes() {
    let estado3 = 'ENVIADO';
    this.api.getPendientes(this.destino, estado3, this.dategt, this.datelt,).subscribe((data) => {
      this.totales = data.serverResponse;
      console.log(this.totales);
      if (data.totalDocs > 0) {
        for (let i = 0; i < data.totalDocs; i++) {
          this.ale = this.totales[i];
          const hasDayChanged = this.checkIfDayChanged(this.ale.fechaderivado);
          console.log(hasDayChanged);
          

          if (hasDayChanged) {
            this.alerta = true;
          }else{
            this.alerta = false;
          }

        }
      } else {
        this.alerta = false;
      }
    });
  }

  calcHour(fecha:any){
    const horas = this.calculateHourDifference(fecha, this.hoy)
    console.log('Horas:', horas);
    return horas
  } 




  pendintes() {
    return true;
  }
  seguimi(idh: any) {
    //this.loading = true;
    this.idhr = idh;
    this.api.obtenerHoja(idh).subscribe(
      (data) => {
        // this.loading = false;
        this.hojaRuta = data.serverResponse;
        this.api.buscarnuit(this.hojaRuta.nuit).subscribe(
          (data) => {
            this.seguim = data;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }


  buscarSeguimientos() {
    this.campo = parseInt(this.campo)
    if (this.campo == this.year - 1) {
      this.dategt = this.campo;
      this.datelt = this.campo + 1;
    } else if (this.campo == this.year) {
      this.dategt = this.campo;
      this.datelt = this.campo + 1;
    } else {
      this.dategt = this.campo;
      this.datelt = this.year + 1;
    }
    this.estado = '';
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
        //this.nuit = '';
        this.totalSeguimientos = data.totalDocs;
        this.totalPages = Math.ceil(this.totalSeguimientos / this.limit);
      });
  }

  getSeguimientos() {
    this.campo = parseInt(this.campo)
    if (this.campo == this.year - 1) {
      this.dategt = this.campo;
      this.datelt = this.campo + 1;
    } else if (this.campo == this.year) {
      this.dategt = this.campo;
      this.datelt = this.campo + 1;
    } else {
      this.dategt = this.campo;
      this.datelt = this.year + 1;
    }
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
        this.nuit = '';
        this.totalSeguimientos = data.totalDocs;
        this.totalPages = Math.ceil(this.totalSeguimientos / this.limit);
        this.obtenertotal()
        // console.log(this.seguimientos);
      });
  }

  paginaAnterior() {
    this.skip--;
    this.seguimientos = [];
    this.getSeguimientos();
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
    this.seguimientos = [];
    this.getSeguimientos();
  }

  changeStatus(status: any) {
    this.estado = status;
    this.getSeguimientos();
    this.skip = 1;
  }

  obtenertotal() {
    this.campo = parseInt(this.campo)
    if (this.campo == this.year - 1) {
      this.dategt = this.campo;
      this.datelt = this.campo + 1;
    } else if (this.campo == this.year) {
      this.dategt = this.campo;
      this.datelt = this.campo + 1;
    } else {
      this.dategt = this.campo;
      this.datelt = this.year + 1;
    }
    this.api.getTotalSeguimientos(this.destino, this.dategt, this.datelt,).subscribe(
      (data) => {
        this.total = data.total;
        this.totalRecibidos = data.recibido;
        this.totalDerivados = data.derivado;
        this.totalEnviados = data.enviado;
        this.totalMaletin = data.maletin;
        this.totalOfi = data.fileOficina
        /* this.totalRecibidos = this.totales.filter(
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
this.totalOfi = this.totales.filter(
  (list: { estado: string }) => list.estado === 'FILE OFICINA'
).length; */
      },
      (error) => {
        console.log(error);
      }
    );
  }




  cambiarEstado(id: any) {
    let hoy: any = new Date();
    const SEGUI: Segui = {
      fecharecepcion: hoy,
      estado: this.status,
      recibidox: this.data.username + ' ' + this.data.surnames,
    };
    this.api.getSegui(id).subscribe(
      (data) => {
        this.segui = data;
        let ids = this.segui._id;
        if (this.segui.fecharecepcion === 'SIN RECEPCIONAR') {
          Swal.fire({
            title: 'Estás seguro de Recibir?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Recibir',
          }).then((result) => {
            if (result.isConfirmed) {
              this.api.EditarSeguis(ids, SEGUI).subscribe(
                (data) => {
                  this.estado = '';
                  this.obtenertotal();
                  this.getpendientes()
                  this.getSeguimientos();
                  this.router.navigate(['/ruta/office/index']);

                },
                (error) => {
                  console.log(error);
                }
              );
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
            this.seguimi(id)
            //this.router.navigate(['/', id]);
          }
        });
        this.lisaso = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  finalizar(id: any) {
    Swal.fire({
      title: '¿Estás seguro archivar en tu MALETIN?',
      text: 'Debe insertar el motivo o detalle del envio a tu maletin',
      icon: 'warning',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sì, Enviar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sms = result.value;
        const SEGUI: Segui = {
          estado: this.estadofin,
          smsarchivo: this.sms,
          fecharespuesta: this.today,
        };
        this.api.EditarSeguis(id, SEGUI).subscribe(
          (data) => {
            Swal.fire('', 'El tramite fue enviado a su MALETIN', 'success');
            this.router.navigate(['/ruta/office/index']);
            this.getSeguimientos();
            this.obtenertotal();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  reactivar(id: any) {
    const SEGUI: Segui = {
      estado: this.status,
      fecharespuesta: this.vacio,
    };
    Swal.fire({
      title: '¿Estás seguro Reactivar?',
      text: 'Esta seguro de reactivar el trámite!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sì, Reactivar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.getSegui(id).subscribe((data) => {
          if (data.estado == "FILE OFICINA") {
            data.archivofi.forEach((element: any) => {
              this.api.eliminarArc(element._id).subscribe((data) => {
              })
            });
          }
        })
        this.api.EditarSeguis(id, SEGUI).subscribe(
          (data) => {
            Swal.fire('', 'El tramite se reactivo', 'success');
            this.estado = '';
            this.getSeguimientos();
            this.obtenertotal();
            this.router.navigate(['/ruta/office/index']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  reply(id: any) {
    const SEGUID: Segui = {
      estado: this.status,
      fecharespuesta: this.vacio,
    };
    this.api.getSegui(id).subscribe(
      (data) => {
        this.seguireply = data;
        this.nuitreply = this.seguireply.nuit;
        this.api.buscarnuit(this.nuitreply).subscribe(
          (data) => {
            this.nuitre = data;
            for (let i = 0; i < this.nuitre.length; i++) {
              this.res = this.nuitre[i];
              if (this.res._id === id) {
                this.idreply = i + 2;
              }
              if (
                this.res.estado === 'ENVIADO' &&
                this.idreply === this.nuitre.length
              ) {
                Swal.fire({
                  title: '¿Estás seguro cancelar?',
                  text: 'Esta seguro eliminar lo que has derivado?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Sì, Eliminar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.api.eliminarSegui(this.res._id).subscribe(
                      (data) => { },
                      (error) => {
                        console.log(error);
                      }
                    );
                    this.api.EditarSeguis(id, SEGUID).subscribe(
                      (data) => { },
                      (error) => {
                        console.log(error);
                      }
                    );
                    Swal.fire(
                      'Eliminado!',
                      'El tramite se ha restauradado al ultimo accion',
                      'success'
                    );
                    this.router.navigate(['/ruta/office/index']);
                    this.getSeguimientos();
                    this.obtenertotal();
                  }
                });
              } else {
                Swal.fire(
                  'No puede eliminar la derivaciòn que ya fue recibida '
                );
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ver(id: any) {
    const SEGUI: Segui = {
      fecharecepcion: this.today,
      estado: this.status,
      recibidox: this.data.username + ' ' + this.data.surnames,
    };
    this.api.getSegui(id).subscribe(
      (data) => {
        this.seguireply = data;
        this.nuitreply = this.seguireply.idhj._id;
        console.log("data", data)
        /* this.api.obtenerHoja(this.nuitreply).subscribe((data:any)=>{
          console.log("hoja ruta",data)
        }) */
        this.api.obtenerHoja(this.nuitreply).subscribe(
          (data: any) => {
            this.nuitre = data.serverResponse.seguimiento;
            console.log("verdaddero", this.nuitre)
            if (this.nuitre.length > 1) {
              for (let i = 0; i < this.nuitre.length; i++) {
                if (i === this.nuitre.length - 2) {
                  this.res = this.nuitre[i];
                  console.log(this.res.destino);
                  this.api.getUserPost(this.res.destino).subscribe(
                    (data) => {
                      this.user = data;
                      this.nombreus =
                        this.user.username + ' ' + this.user.surnames;
                      Swal.fire({
                        title: this.res.destino,
                        text:
                          'A cargo de: ' +
                          ' ' +
                          this.nombreus +
                          '................................   ' +
                          'Origen: ' +
                          this.seguireply.origenhr +
                          '....................................         ' +
                          ' Referencia: ' +
                          this.seguireply.referencia,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Sì, Recibir',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          this.api.EditarSeguis(id, SEGUI).subscribe(
                            (data) => {
                              this.getSeguimientos();
                              this.obtenertotal();
                              this.router.navigate(['/ruta/office/index']);
                            },
                            (error) => {
                              console.log(error);
                            }
                          );
                          this.router.navigate(['/ruta/office/index']);
                        }
                      });
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              }
            } else {
              this.res = this.nuitre[0];
              console.log(this.res.nombre);
              Swal.fire({
                title: 'SECRETARIA DE DESPACHO',
                text:
                  'A cargo de: ' +
                  ' ' +
                  this.res.nombre +
                  '................................   ' +
                  'Origen: ' +
                  this.seguireply.origenhr +
                  '....................................         ' +
                  ' Referencia: ' +
                  this.seguireply.referencia,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sì, Recibir',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.api.EditarSeguis(id, SEGUI).subscribe(
                    (data) => {
                      this.getSeguimientos();
                      this.obtenertotal();
                      this.router.navigate(['/ruta/office/index']);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                  this.router.navigate(['/ruta/office/index']);
                }
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  asociar(hoja: any) {

    // console.log(this.data.post);
    this.asociarForm.patchValue({
      cargo: this.data.post,
    });

    this.hojaAsociar = hoja.idhj;
    // console.log(this.hojaAsociar);

  }
  asociar2() {

    this.api.asociar(this.hojaAsociar.nuit, this.asociarForm.value).subscribe(
      (data) => {

        console.log(data);
        this.asociarForm.reset();
        this.getSeguimientos();
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

  verAsociados(hr: any) {
    // console.log('prin1', hr.idhj);
    this.last = hr.idhj.seguimiento[hr.idhj.seguimiento.length - 1];
    console.log(this.last);

    this.api.getHr(hr.idhj._id).subscribe(
      (data) => {
        this.hrPrincipal = data;
        this.asociadosHr = data.asociados;


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

  consultaAsociar(hoja: any) {
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
      if (result.isDismissed) {
        // console.log('no');
        this.asociarForm.reset();
      }
    })
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

    return resultado;
  }

}
