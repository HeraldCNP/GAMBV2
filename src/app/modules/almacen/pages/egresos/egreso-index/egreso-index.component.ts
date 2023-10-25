import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { EgresosService } from '../../../services/egresos.service';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-egreso-index',
  templateUrl: './egreso-index.component.html',
  styleUrls: ['./egreso-index.component.css']
})
export class EgresoIndexComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  totalEgresos: any = 0;
  egresos: any = [];
  programas: any = [];
  egresosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  proveedorForm: any;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;
  URL = environment.api;
  egreso: any;
  date = new Date();
  separados: any;
  categories: any;
  categoryTotalPrices: any = 0;
  nameCat: any = [];
  reportForm: any;

  nombre: string = '';
  cargo: string = '';
  glosaSalida: string = '';
  numeroSalida?: any;
  del: string = new Date('01/01/2023').toISOString();
  al: string = new Date().toISOString();
  fechaIni = new Date('01/01/2023').toISOString();
  fechaHoy = new Date().toISOString();

  constructor(private egresosService: EgresosService, private fb: FormBuilder, private router: Router, private almacenService: AlmacenService) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;

    this.reportForm = this.fb.group({
      nombre: [''],
      cargo: [''],
      glosaSalida: [''],
      numeroSalida: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
    });
  }

  ngOnInit(): void {
    this.cargarEgresos()
  }

  // cargarEgresos() {
  //   this.cargando = true;
  //   this.egresosService
  //     .getAllEgresos(this.limit, this.skip)
  //     .subscribe((data: any) => {
  //       this.totalEgresos = data.totalDocs;
  //       this.egresos = data;
  //       this.egresosTemp = data;
  //       this.totalPages = data.totalpage;
  //       console.log(data);
  //       this.cargando = false;
  //     });
  // }


  cargarEgresos() {
    this.cargando = true;
    this.egresosService
      .getAllEgresos(this.limit, this.skip, this.nombre, this.cargo, this.glosaSalida, this.numeroSalida, this.del, this.al)
      .subscribe((data: any) => {
        this.totalEgresos = data.totalDocs;
        this.egresos = data;
        this.egresosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  get form2() {
    return this.reportForm.controls;
  }

  obtenerSalidas(form:any){
    this.nombre = form.value.nombre;
    this.cargo = form.value.cargo;
    this.glosaSalida = form.value.glosaSalida;
    this.numeroSalida = form.value.numeroSalida;
    this.del = form.value.del;
    this.al = form.value.al;
    this.skip = 0;
    this.limit = 0;
    this.cargarEgresos();
  }

  addSalida() {
    this.router.navigate(['almacen/egreso/create']);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.egresos = this.egresosTemp;
      return;
    }
    this.egresosService.searchEgreso(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.egresos = resp;
      this.egresosTemp = resp;
    });
  }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }
    this.cargarEgresos();
  }

  getEgreso(id: string) {
    this.egresosService.getEgreso(id)
      .subscribe(
        res => {
          this.egreso = res;
          // console.log(this.egreso)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.separar();
        }
      );
  }

  borrarEgreso(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'El Proyecto ha sido eliminado.', 'success');
        this.egresosService.deleteEgreso(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarEgresos()
        );
      }
    });
  }

  separar() {
    const itemsByCategory = this.egreso.productos.reduce((accumulator: any, current: any) => {
      if (!accumulator[current.catProgra]) {
        accumulator[current.catProgra] = [];
      }
      accumulator[current.catProgra].push(current);
      // console.log("solo", current);
      return accumulator;
    }, {});
    this.separados = itemsByCategory;
    this.categories = Object.keys(itemsByCategory);

    this.categories.forEach((element: any) => {
      // console.log(this.separados[element]);

      this.separados[element].sort((a: any, b: any) => {
        const codigoA = a.idCompra.idArticulo.idPartida.codigo;
        const codigoB = b.idCompra.idArticulo.idPartida.codigo;
        return codigoA.localeCompare(codigoB);
      });

      // console.log("ordenados", this.separados[element]);
    });

    this.categoryTotalPrices = this.categories.reduce((accumulator: any, category: any) => {
      const items = itemsByCategory[category];
      const total = items.reduce((accumulator: any, item: any) => accumulator + (item.idCompra.precio * item.cantidadSalida), 0);
      this.almacenService.searchSegCategoria(category)
        .subscribe(
          res => {
            this.nameCat[category] = res.serverResponse[0].proyect_acti
            // console.log(this.nameCat)
          }
        );
      accumulator[category] = total;
      return accumulator;
    }, {});
    // console.log("sumas", this.categoryTotalPrices)
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasSeparadas", this.separados)
  }

  calculateTotalCost() {
    return this.egreso.productos.reduce((acc: any, item: any) => acc + (item.idCompra.precio * item.cantidadSalida), 0);
  }

  generatePDFS() {
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
      scale: 2,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        var imgWidth = 208;
        var pageHeight = 279;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 0;

        doc.addImage(imgData, 'PNG', 3, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          doc.save('file.pdf');
        }
        doc.save('file.pdf');
        return doc;
      })
      .then((docResult) => {
        // docResult.save('file.pdf');
        docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
        //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
      });
  }

  editarSalida(id: string) {
    this.router.navigate(['almacen/egreso/update', id]);
  }

}
