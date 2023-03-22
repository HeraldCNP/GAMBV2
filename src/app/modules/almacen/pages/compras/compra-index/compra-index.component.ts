import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';

@Component({
  selector: 'app-compra-index',
  templateUrl: './compra-index.component.html',
  styleUrls: ['./compra-index.component.css']
})
export class CompraIndexComponent implements OnInit {
  totalIngresos: any = 0;
  ingresos: any = [];
  programas: any = [];
  ingresosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  proveedorForm: any;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;
  URL = environment.api;
  ingreso: any;
  date = new Date();
  separados:any;
  categories:any;
  categoryTotalPrices:any = 0;
  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.cargando = true;
    this.comprasService
      .getAllIngresos(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalIngresos = data.totalDocs;
        this.ingresos = data;
        this.ingresosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.ingresos = this.ingresosTemp;
      return;
    }
    this.comprasService.searchIngreso(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.ingresos = resp;
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
    this.cargarIngresos();
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    this.comprasService.editIngreso(fd, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.cargarIngresos();
      }
    );
  }

  borrarIngreso(id: string) {
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
        this.comprasService.deleteIngreso(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarIngresos()
        );
      }
    });
  }

  addIngreso() {
    this.router.navigate(['almacen/compra/create']);
  }


  generatePDF() {
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
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 5;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('file.pdf');
        return doc;
      })
      .then((docResult) => {
        docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
        //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
      });
  }

  separar() {
    const itemsByCategory = this.ingreso.productos.reduce((accumulator:any, current:any) => {
      if (!accumulator[current.catProgra]) {
        accumulator[current.catProgra] = [];
      }
      accumulator[current.catProgra].push(current);
      // console.log("solo", current);
      return accumulator;
    }, {});
    this.separados = itemsByCategory;
    this.categories = Object.keys(itemsByCategory);

    this.categoryTotalPrices = this.categories.reduce((accumulator:any, category:any) => {
      const items = itemsByCategory[category];
      const total = items.reduce((accumulator:any, item:any) => accumulator + (item.precio * item.cantidadCompra), 0);
      accumulator[category] = total;
      return accumulator;
    }, {});
    console.log("sumas", this.categoryTotalPrices)
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasSeparadas", this.separados)
  }

  calculateTotalCostByCategory() {
    return this.ingreso.productos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }


  getIngreso(id: string) {
    this.comprasService.getIngreso(id)
      .subscribe(
        res => {
          this.ingreso = res;
          console.log(this.ingreso)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.separar();
        }
      );
  }

  calculateTotalCost() {
    return this.ingreso.productos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }

  registrarEgreso(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Registrado!', 'El Egreso ha sido registrado.', 'success');
        this.comprasService.createEgreso(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.router.navigate(['almacen/egreso/index'])
        );
      }
    });
  }


  editarEntrada(id:string){
    this.router.navigate(['almacen/compra/update', id]);
  }



}
